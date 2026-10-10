import type { ConsultationState } from '../types/consultation';

export interface StepMissingItem {
  field: string;
  label: string;
}

export interface StepValidation {
  stepIndex: number; // 0 to 7
  stepNumber: number; // 1 to 8
  stepName: string;
  isComplete: boolean;
  missingItems: StepMissingItem[];
}

/**
 * Returns validation status for a specific consultation step (0-indexed).
 * Flags only IMPORTANT (required) fields. Optional fields are never flagged.
 */
export const getStepValidation = (stepIndex: number, state: ConsultationState): StepValidation => {
  const f = state?.fields || {};
  const missingItems: StepMissingItem[] = [];

  switch (stepIndex) {
    case 0: // Step 1: Purpose
      if (!f.client?.trim()) {
        missingItems.push({ field: 'client', label: 'Customer Name' });
      }
      if (!f.location?.trim()) {
        missingItems.push({ field: 'location', label: 'Project Location' });
      }
      return {
        stepIndex: 0,
        stepNumber: 1,
        stepName: 'Purpose',
        isComplete: missingItems.length === 0,
        missingItems
      };

    case 1: // Step 2: Worship
      if (!f.deity?.trim()) {
        missingItems.push({ field: 'deity', label: 'Deities, traditions and idols' });
      }
      return {
        stepIndex: 1,
        stepNumber: 2,
        stepName: 'Worship',
        isComplete: missingItems.length === 0,
        missingItems
      };

    case 2: // Step 3: Space
      if (!f.dimensions?.trim()) {
        missingItems.push({ field: 'dimensions', label: 'Space Dimensions' });
      }
      return {
        stepIndex: 2,
        stepNumber: 3,
        stepName: 'Space',
        isComplete: missingItems.length === 0,
        missingItems
      };

    case 3: // Step 4: Alignment
      if (!f.budget?.trim()) {
        missingItems.push({ field: 'budget', label: 'Comfortable Investment Range' });
      }
      if (!f.installation?.trim()) {
        missingItems.push({ field: 'installation', label: 'Desired Installation Date' });
      }
      return {
        stepIndex: 3,
        stepNumber: 4,
        stepName: 'Alignment',
        isComplete: missingItems.length === 0,
        missingItems
      };

    case 4: // Step 5: Visual Direction / Examples
      const hasRef = Boolean(state?.selected_reference?.data);
      if (!hasRef) {
        missingItems.push({ field: 'selected_reference', label: 'One Visual Reference Choice' });
      }
      return {
        stepIndex: 4,
        stepNumber: 5,
        stepName: 'Examples',
        isComplete: missingItems.length === 0,
        missingItems
      };

    case 5: // Step 6: Scope & Investment
      if (!f.scope?.trim()) {
        missingItems.push({ field: 'scope', label: 'Recommended Scope & Direction' });
      }
      if (!f.estimate?.trim()) {
        missingItems.push({ field: 'estimate', label: 'Indicative Project Budget' });
      }
      return {
        stepIndex: 5,
        stepNumber: 6,
        stepName: 'Scope',
        isComplete: missingItems.length === 0,
        missingItems
      };

    case 6: // Step 7: Your Journey
      // Architectural Journey walkthrough is educational/informative; always complete
      return {
        stepIndex: 6,
        stepNumber: 7,
        stepName: 'Your Journey',
        isComplete: true,
        missingItems: []
      };

    case 7: // Step 8: Proposal
      return {
        stepIndex: 7,
        stepNumber: 8,
        stepName: 'Proposal',
        isComplete: true,
        missingItems: []
      };

    default:
      return {
        stepIndex,
        stepNumber: stepIndex + 1,
        stepName: `Step ${stepIndex + 1}`,
        isComplete: true,
        missingItems: []
      };
  }
};

/**
 * Returns validation results for all 8 consultation steps.
 */
export const getAllStepsValidation = (state: ConsultationState): StepValidation[] => {
  return [0, 1, 2, 3, 4, 5, 6, 7].map(idx => getStepValidation(idx, state));
};

/**
 * Returns list of steps (1 to 7) that are missing required information.
 */
export const getIncompleteSteps = (state: ConsultationState): StepValidation[] => {
  return getAllStepsValidation(state).slice(0, 7).filter(s => !s.isComplete);
};

/**
 * Checks whether all 7 preparation steps have their important information filled.
 */
export const areAllPreparationStepsComplete = (state: ConsultationState): boolean => {
  return getIncompleteSteps(state).length === 0;
};
