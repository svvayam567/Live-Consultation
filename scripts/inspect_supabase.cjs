const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env.local');
const env = {};
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split(/\r?\n/).forEach(line => {
    const idx = line.indexOf('=');
    if (idx !== -1) {
      const k = line.slice(0, idx).trim();
      let v = line.slice(idx + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      env[k] = v;
    }
  });
}

console.log('Environment configuration detected:');
console.log('- VITE_SUPABASE_URL:', env.VITE_SUPABASE_URL ? 'CONFIGURED (' + env.VITE_SUPABASE_URL.replace(/https:\/\/(.{4}).*(\.supabase\.co)/, 'https://$1...$2') + ')' : 'NOT SET');
console.log('- VITE_SUPABASE_PUBLISHABLE_KEY:', env.VITE_SUPABASE_PUBLISHABLE_KEY ? 'CONFIGURED' : 'NOT SET');
console.log('- SUPABASE_SERVICE_ROLE_KEY:', env.SUPABASE_SERVICE_ROLE_KEY ? 'CONFIGURED' : 'NOT SET');

if (!env.VITE_SUPABASE_URL || (!env.VITE_SUPABASE_PUBLISHABLE_KEY && !env.SUPABASE_SERVICE_ROLE_KEY)) {
  console.log('Supabase credentials missing or incomplete.');
  process.exit(0);
}

const { createClient } = require('@supabase/supabase-js');
const client = createClient(env.VITE_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_PUBLISHABLE_KEY);

async function inspect() {
  const tables = [
    'profiles',
    'projects',
    'consultations',
    'journey_stage_progress',
    'journey_updates',
    'messages',
    'admin_activity',
    'client_projects',
    'reference_grid',
    'journey_assets'
  ];

  console.log('\n--- SUPABASE DATABASE INSPECTION ---');
  for (const t of tables) {
    try {
      const { count, error } = await client.from(t).select('*', { count: 'exact', head: true });
      if (error) {
        console.log(`- ${t}: ${error.code} - ${error.message}`);
      } else {
        console.log(`- ${t}: ${count} rows`);
      }
    } catch (e) {
      console.log(`- ${t}: Exception (${e.message})`);
    }
  }

  // Auth users check
  if (env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const { data, error } = await client.auth.admin.listUsers();
      if (error) {
        console.log(`- auth.users: Error (${error.message})`);
      } else {
        console.log(`- auth.users: ${data?.users?.length || 0} registered user accounts`);
        if (data?.users?.length) {
          data.users.forEach((u, i) => {
            const role = u.user_metadata?.role || 'unknown';
            const email = u.email || 'no-email';
            const phone = u.phone || u.user_metadata?.phone || 'no-phone';
            console.log(`  [${i + 1}] ID: ${u.id.slice(0, 8)}... | Email: ${email} | Phone: ${phone} | Role: ${role}`);
          });
        }
      }
    } catch (e) {
      console.log(`- auth.users: Exception (${e.message})`);
    }
  } else {
    console.log('- auth.users: Requires SUPABASE_SERVICE_ROLE_KEY to inspect auth user list');
  }

  // Storage buckets check
  try {
    const { data: buckets, error: bErr } = await client.storage.listBuckets();
    if (bErr) {
      console.log(`- storage.buckets: Error (${bErr.message})`);
    } else {
      console.log(`- storage.buckets: ${(buckets || []).map(b => b.name).join(', ') || 'none'}`);
      for (const b of (buckets || [])) {
        try {
          const { data: files } = await client.storage.from(b.name).list();
          console.log(`  bucket "${b.name}": ${files?.length || 0} top-level files`);
        } catch {}
      }
    }
  } catch (e) {
    console.log(`- storage.buckets: Exception (${e.message})`);
  }
}

inspect();
