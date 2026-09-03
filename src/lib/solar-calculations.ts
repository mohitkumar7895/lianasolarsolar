import { SOLAR_SPECS } from './constants';
import { SolarCalculationInput, SolarCalculationResult } from '@/types';

export function calculateSolarSystem(input: SolarCalculationInput): SolarCalculationResult {
  const bill = Math.max(500, input.monthlyBill || 2500);
  const tariff = SOLAR_SPECS.averageTariffInr;

  // Monthly consumption in kWh (units)
  const monthlyUnits = bill / tariff;
  const dailyUnitsRequired = monthlyUnits / 30;

  // Sizing formula
  let recommendedCapacityKw = dailyUnitsRequired / SOLAR_SPECS.dailyGenerationPerKw;

  if (recommendedCapacityKw < 1.5) {
    recommendedCapacityKw = 1;
  } else if (recommendedCapacityKw < 2.5) {
    recommendedCapacityKw = 2;
  } else if (recommendedCapacityKw < 3.5) {
    recommendedCapacityKw = 3;
  } else {
    recommendedCapacityKw = Math.ceil(recommendedCapacityKw);
  }

  const dailyGenerationKwh = Number((recommendedCapacityKw * SOLAR_SPECS.dailyGenerationPerKw).toFixed(1));
  const monthlyGenerationKwh = Math.round(dailyGenerationKwh * 30);
  const annualGenerationKwh = Math.round(
    recommendedCapacityKw * SOLAR_SPECS.dailyGenerationPerKw * SOLAR_SPECS.annualGenerationDays
  );

  const rooftopAreaRequiredSqFt = recommendedCapacityKw * SOLAR_SPECS.sqFtPerKw;
  const estimatedSystemCost = recommendedCapacityKw * SOLAR_SPECS.benchmarkCostPerKw;

  const connType = input.propertyType || input.connectionType || 'residential';
  let estimatedSubsidy = 0;
  if (connType === 'residential') {
    if (recommendedCapacityKw === 1) {
      estimatedSubsidy = 30000;
    } else if (recommendedCapacityKw === 2) {
      estimatedSubsidy = 60000;
    } else if (recommendedCapacityKw >= 3) {
      estimatedSubsidy = SOLAR_SPECS.subsidyRules.maxResidentialSubsidy;
    }
  }

  const netInvestmentCost = Math.max(0, estimatedSystemCost - estimatedSubsidy);
  const monthlySavings = Math.round(Math.min(bill, monthlyGenerationKwh * tariff));
  const annualSavings = monthlySavings * 12;
  const lifetimeSavings25Yrs = annualSavings * 25;
  const paybackPeriodYears =
    annualSavings > 0 ? Number((netInvestmentCost / annualSavings).toFixed(1)) : 3.5;

  const co2ReductionTonnesPerYear = Number(
    ((annualGenerationKwh * SOLAR_SPECS.co2ReductionKgPerKwh) / 1000).toFixed(2)
  );
  const treesPlantedEquivalent = Math.round(co2ReductionTonnesPerYear * SOLAR_SPECS.treesPerTonCo2);

  return {
    recommendedCapacityKw,
    rooftopAreaRequiredSqFt,
    dailyGenerationKwh,
    monthlyGenerationKwh,
    monthlyUnitsEstimate: Math.round(monthlyUnits),
    annualGenerationKwh,
    estimatedSystemCost,
    estimatedSubsidy,
    netInvestmentCost,
    monthlySavings,
    annualSavings,
    estimatedAnnualSavings: annualSavings,
    lifetimeSavings25Yrs,
    paybackPeriodYears,
    estimatedPaybackYears: paybackPeriodYears,
    co2ReductionTonnesPerYear,
    co2OffsetTonnesPerYear: co2ReductionTonnesPerYear,
    treesPlantedEquivalent,
  };
}
