/**
 * This file contains all the pricing and configuration constants for the application.
 * It serves as the single source of truth for any cost-related calculations.
 */

// The default monthly recurring cost for the base agent.
export const DEFAULT_MONTHLY_COST = 300;

// The default one-time initial payment for setting up the agent.
export const DEFAULT_INITIAL_PAYMENT = 2500;

// The default annual recurring payment, derived from the monthly cost.
export const DEFAULT_ANNUAL_RECURRING_PAYMENT = DEFAULT_MONTHLY_COST * 12;