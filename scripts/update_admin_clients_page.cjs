const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'src', 'pages', 'admin', 'AdminClientsPage.tsx');
let content = fs.readFileSync(targetPath, 'utf8');

// 1. Replace SEED_CONSULTATIONS
const seedRegex = /const SEED_CONSULTATIONS: ConsultationRecord\[\] = \[[\s\S]*?\n\];/;
if (!seedRegex.test(content)) {
  console.error('Could not find SEED_CONSULTATIONS block');
  process.exit(1);
}
content = content.replace(seedRegex, 'const SEED_CONSULTATIONS: ConsultationRecord[] = [];');
console.log('✓ Cleared SEED_CONSULTATIONS');

// 2. Update loadConsultations fallback and loadCustomers
const loadConsultationsOld = `    // Fallback: Local storage check or default seed
    try {
      const stored = localStorage.getItem('svvayam_admin_consultations_v1');
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const filtered = parsed.filter((c: any) => !deletedIds.includes(c.id));
          setConsultations(filtered);
          setLoadingConsultations(false);
          return;
        }
      }
    } catch {
      // Ignored
    }

    const remainingSeeds = SEED_CONSULTATIONS.filter((c) => !deletedIds.includes(c.id));
    setConsultations(remainingSeeds);
    localStorage.setItem('svvayam_admin_consultations_v1', JSON.stringify(remainingSeeds));
    setLoadingConsultations(false);
  };

  // Load customer accounts
  const loadCustomers = () => {
    const list = getRegisteredCustomers();
    setCustomers(list);
  };`;

const loadConsultationsNew = `    // Fallback: Local storage check
    try {
      const stored = localStorage.getItem('svvayam_admin_consultations_v1');
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const filtered = parsed.filter((c: any) => !deletedIds.includes(c.id) && !String(c.id).startsWith('seed-'));
          setConsultations(filtered);
          setLoadingConsultations(false);
          return;
        }
      }
    } catch {
      // Ignored
    }

    setConsultations([]);
    setLoadingConsultations(false);
  };

  // Load customer accounts
  const loadCustomers = () => {
    const list = getRegisteredCustomers().filter((c) => !String(c.id).startsWith('cust-00') && !String(c.id).startsWith('seed-'));
    setCustomers(list);
  };`;

if (!content.includes(loadConsultationsOld)) {
  console.error('Could not find loadConsultationsOld block');
  process.exit(1);
}
content = content.replace(loadConsultationsOld, loadConsultationsNew);
console.log('✓ Updated loadConsultations and loadCustomers');

// 3. Rename Header from "Client Explorer" to "Clients"
const headerOld = `<h1 className="text-xl sm:text-2xl font-medium text-[#0A0A0A]">
                Client Explorer
              </h1>`;
const headerNew = `<h1 className="text-xl sm:text-2xl font-medium text-[#0A0A0A]">
                Clients
              </h1>`;

if (!content.includes(headerOld)) {
  console.error('Could not find headerOld block');
  process.exit(1);
}
content = content.replace(headerOld, headerNew);
console.log('✓ Renamed header to Clients');

// 4. Update Consultations table empty state
const tableEmptyOld = `                    ) : filteredConsultations.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="py-8 text-center text-neutral-400">
                          No matching consultation records found.
                        </td>
                      </tr>
                    ) : (`;

const tableEmptyNew = `                    ) : filteredConsultations.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="py-16 text-center">
                          <div className="max-w-sm mx-auto space-y-3">
                            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                              <Users className="w-5 h-5" />
                            </div>
                            <p className="text-sm font-medium text-[#0A0A0A]">
                              {consultations.length === 0 ? 'No clients registered yet.' : 'No matching consultation records found.'}
                            </p>
                            <p className="text-xs text-neutral-500 font-sans">
                              {consultations.length === 0
                                ? 'Register a new customer account or begin a live consultation to create client records.'
                                : 'Try adjusting your search query or filters to find consultations.'}
                            </p>
                            {consultations.length === 0 && (
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => navigate('/admin/register')}
                                className="text-xs bg-[#0A0A0A] text-white hover:bg-neutral-800 rounded-full cursor-pointer inline-flex items-center gap-1.5"
                              >
                                <UserPlus className="w-3.5 h-3.5 text-white" />
                                <span>Register Customer</span>
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ) : (`;

if (!content.includes(tableEmptyOld)) {
  console.error('Could not find tableEmptyOld block');
  process.exit(1);
}
content = content.replace(tableEmptyOld, tableEmptyNew);
console.log('✓ Updated consultations table empty state');

// 5. Update Customer accounts tab empty state
const custGridOld = `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {customers.map((cust) => (`;

const custGridNew = `{customers.length === 0 ? (
              <div className="p-12 border border-dashed border-neutral-300 rounded-[16px] text-center bg-neutral-50/50 space-y-3">
                <div className="w-12 h-12 rounded-full bg-white border border-neutral-200 flex items-center justify-center mx-auto text-neutral-400 shadow-xs">
                  <Users className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-[#0A0A0A]">No clients registered yet.</h4>
                  <p className="text-xs text-neutral-500 font-sans max-w-sm mx-auto">
                    Active customer accounts will appear here once registered with portal credentials.
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/admin/register')}
                  className="text-xs bg-[#0A0A0A] text-white hover:bg-neutral-800 rounded-full cursor-pointer inline-flex items-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5 text-white" />
                  <span>Register Customer</span>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {customers.map((cust) => (` ;

if (!content.includes(custGridOld)) {
  console.error('Could not find custGridOld block');
  process.exit(1);
}
content = content.replace(custGridOld, custGridNew);

// Close the ternary for customers
const custEndOld = `              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: DIRECT INQUIRIES & REPLIES                         */}`;

const custEndNew = `              ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: DIRECT INQUIRIES & REPLIES                         */}`;

if (!content.includes(custEndOld)) {
  console.error('Could not find custEndOld block');
  process.exit(1);
}
content = content.replace(custEndOld, custEndNew);
console.log('✓ Updated customers tab empty state');

// 6. Update Direct inquiries empty state
const inboxOld = `<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Thread list */}
              <div className="space-y-2 md:col-span-1">`;

const inboxNew = `{consultations.length === 0 ? (
              <div className="p-12 border border-dashed border-neutral-300 rounded-[16px] text-center bg-neutral-50/50 space-y-2">
                <p className="text-sm font-medium text-[#0A0A0A]">No clients registered yet.</p>
                <p className="text-xs text-neutral-500 font-sans">
                  Direct message threads and inquiries will appear here once client sanctums are registered.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Thread list */}
                <div className="space-y-2 md:col-span-1">`;

if (!content.includes(inboxOld)) {
  console.error('Could not find inboxOld block');
  process.exit(1);
}
content = content.replace(inboxOld, inboxNew);

const inboxEndOld = `              </div>
            </div>
          </div>
        )}
      </main>`;

const inboxEndNew = `              </div>
            </div>
            )}
          </div>
        )}
      </main>`;

if (!content.includes(inboxEndOld)) {
  console.error('Could not find inboxEndOld block');
  process.exit(1);
}
content = content.replace(inboxEndOld, inboxEndNew);
console.log('✓ Updated inquiries tab empty state');

fs.writeFileSync(targetPath, content, 'utf8');
console.log('✓ Successfully wrote updated AdminClientsPage.tsx');
