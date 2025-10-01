"use client";
import React, { useState } from "react";
import { configuratorContent } from './content';
import { coreModules, extraModules } from './modules';
import Link from 'next/link'; // Import Link for the CTA




function ModuleCard({
	mod,
	checked,
	onClick,
	disabled,
}: {
	mod: any;
	checked: boolean;
	onClick: () => void;
	disabled?: boolean;
}) {
	const [expanded, setExpanded] = useState(false);
	return (
		<div className="relative group w-full">
			<button
				type="button"
				onClick={() => !disabled && onClick()}
				className={`w-full text-left rounded-xl border-2 border-blue-200 p-0 shadow-none transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 ${
					checked
						? "bg-blue-50 border-blue-500"
						: "hover:border-blue-400 bg-white"
				} ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
				tabIndex={0}
				aria-disabled={disabled}
			>
				<div className="flex gap-1 items-start py-4 px-6">
					<input
						type="checkbox"
						checked={checked}
						disabled={disabled}
						readOnly
						className={`accent-blue-500 scale-110 mr-2 mt-2 ${
							disabled ? "opacity-60" : ""
						}`}
					/>
					<div className="flex-1">
						<div className="font-bold text-lg text-gray-900">{mod.name}</div>
						<span
							role="button"
							tabIndex={0}
							className="text-xs text-gray-600 underline mt-1 focus:outline-none cursor-pointer inline-block"
							onClick={(e) => {
								e.stopPropagation();
								setExpanded((v) => !v);
							}}
							onKeyPress={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.stopPropagation();
									setExpanded((v) => !v);
								}
							}}
						>
							{expanded ? configuratorContent.hideDescription : configuratorContent.viewDescription}
						</span>
						{expanded && (
							<div className="text-gray-700 text-sm mt-2">
								{mod.description}
							</div>
						)}
					</div>
				</div>
			</button>
			{disabled && (
				<div className="absolute left-1/2 -translate-x-1/2 top-2 z-20 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition pointer-events-none select-none bg-gray-900 text-white text-xs rounded px-3 py-1 shadow-lg border border-blue-400 whitespace-nowrap">
					{configuratorContent.essentialModuleTooltip}
				</div>
			)}
		</div>
	);
}

export default function ConfigurarAgenteContent({ initialSelectedModules = [] }: { initialSelectedModules?: string[] }) {
	const [selectedExtras, setSelectedExtras] = useState<string[]>(initialSelectedModules);
	const [showAnnual, setShowAnnual] = useState(true);

  

	const numberFormatter = new Intl.NumberFormat("es-ES", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});

	const currencyFormatter = new Intl.NumberFormat("es-ES", {
		style: "currency",
		currency: "EUR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});

  

	const handleToggle = (name: string) => {
		setSelectedExtras((prev) =>
			prev.includes(name)
				? prev.filter((m) => m !== name)
				: [...prev, name]
		);
	};

	const totalSinIVA =
		coreModules.reduce((acc, m) => acc + m.price, 0) +
		extraModules
			.filter((m) => selectedExtras.includes(m.name))
			.reduce((acc, m) => acc + m.price, 0);
	const totalMantenimiento = showAnnual
		? 4000 + 600 * selectedExtras.length
		: 400 + 60 * selectedExtras.length;

    // Placeholder for savings estimation inputs (these would typically come from user input)
    const costeMensualActual = 1000; // Example value, needs to be dynamic if there's an input
    const horasInvertidasMes = 100; // Example value, needs to be dynamic if there's an input

    // Calculations for savings estimation
    const ahorroAnualEstimado = costeMensualActual * 12; // Assuming monthly cost savings
    const totalCosteAnualAgente = totalSinIVA + (showAnnual ? totalMantenimiento : totalMantenimiento * 12);
    const netSavingsAnual = ahorroAnualEstimado - totalCosteAnualAgente;
    const paybackPeriodMonths = totalSinIVA > 0 && ahorroAnualEstimado > 0 ? totalSinIVA / (ahorroAnualEstimado / 12) : Infinity;

		// Mobile state for presupuesto modal
		const [showPresupuestoMobile, setShowPresupuestoMobile] = useState(false);

		return (
				<div className="min-h-screen bg-[#070916] flex flex-col items-center py-12 px-4">
					<div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 flex flex-row gap-8 md:flex-row flex-col">
						{/* Main section: full width on mobile */}
						<div className="flex-1 w-full md:w-auto">
						<p className="text-sm text-gray-700 uppercase">
							{configuratorContent.pageSubtitle}
						</p>
						<h1 className="text-3xl font-bold mb-4 text-gray-900">
							{configuratorContent.pageTitle}
						</h1>
						<p className="mb-6 text-gray-700">
							{configuratorContent.pageDescription}
						</p>
						<div className="mb-6">
							<h2 className="text-xl font-semibold text-gray-900 mb-2">
								{configuratorContent.coreModulesTitle}
							</h2>
							<p className="text-sm mb-6 text-gray-700">
								{configuratorContent.coreModulesDescription}
							</p>
							<div className="grid grid-cols-1 gap-1 mb-8">
								{coreModules.map((mod) => (
									<ModuleCard
										key={mod.name}
										mod={mod}
										checked={true}
										onClick={() => {}}
										disabled
									/>
								))}
							</div>
							<div className="flex items-center justify-between mb-2">
								<h2 className="text-xl font-semibold text-gray-900">
									{configuratorContent.extraModulesTitle}
								</h2>
								<span className="text-sm text-blue-700 font-semibold">
									{configuratorContent.extraModulesPriceHint}
								</span>
							</div>
							<div className="grid grid-cols-1 gap-1">
								{extraModules.map((mod) => (
									<ModuleCard
										key={mod.name}
										mod={mod}
										checked={selectedExtras.includes(mod.name)}
										onClick={() => handleToggle(mod.name)}
									/>
								))}
							</div>
						</div>

            
					</div>
					{/* Presupuesto column: hidden on mobile, sticky on desktop */}
					<div className="w-80 bg-gray-100 rounded-lg p-6 flex flex-col justify-between h-full text-gray-900 sticky top-8 hidden md:flex">
						<div>
							<h3 className="text-lg font-semibold text-gray-900 mb-4">
								{configuratorContent.budgetTitle}
							</h3>
							<ul className="text-gray-700 text-sm w-full">
								{coreModules.map((mod) => (
									<li key={mod.name} className="flex justify-between items-center mb-1">
										<span>{mod.name}</span>
										<span className="font-semibold">{numberFormatter.format(mod.price)}€</span>
									</li>
								))}
								{selectedExtras.map((name) => {
									const mod = extraModules.find((m) => m.name === name);
									return mod ? (
										<li key={mod.name} className="flex justify-between items-center mb-1">
											<span>{mod.name}</span>
											<span className="font-semibold">{numberFormatter.format(mod.price)}€</span>
										</li>
									) : null;
								})}
							</ul>
							<div className="mt-6">
								<h4 className="text-base font-semibold text-gray-900 mb-2">
									{configuratorContent.supportMaintenanceTitle}
								</h4>
								<div className="flex gap-2 mb-2">
									<button
										type="button"
										className={`w-1/2 px-3 py-1 rounded-full border text-sm font-semibold transition-colors ${showAnnual ? 'bg-blue-100 border-blue-400 text-blue-700' : 'bg-white border-gray-300 text-gray-700'}`}
										onClick={() => setShowAnnual(true)}
									>
										{configuratorContent.annualButton}
									</button>
									<button
										type="button"
										className={`w-1/2 px-3 py-1 rounded-full border text-sm font-semibold transition-colors ${!showAnnual ? 'bg-blue-100 border-blue-400 text-blue-700' : 'bg-white border-gray-300 text-gray-700'}`}
										onClick={() => setShowAnnual(false)}
									>

										{configuratorContent.monthlyButton}
									</button>
								</div>
								<div className="flex flex-col gap-2 text-sm">
									<div className="flex justify-between items-center">
										<span>{configuratorContent.basicCoreMaintenance}</span>
										<span className="font-semibold">{showAnnual ? '4.000€/año' : '400€/mes'}</span>
									</div>
									{selectedExtras.length > 0 && (
										<div className="flex justify-between items-center">
											<span>{configuratorContent.extraMaintenancePrefix}{selectedExtras.length} módulo{selectedExtras.length > 1 ? configuratorContent.extraMaintenanceSuffixPlural : configuratorContent.extraMaintenanceSuffixSingular}</span>
											<span className="font-semibold">{showAnnual ? `${600 * selectedExtras.length}€/año` : `${60 * selectedExtras.length}€/mes`}</span>
										</div>
									)}
									<div className="flex justify-between items-center font-bold mt-2">
										<span>{configuratorContent.totalMaintenance}</span>
										<span>
											{showAnnual
												? `${currencyFormatter.format(totalMantenimiento)}/año`
												: `${currencyFormatter.format(totalMantenimiento)}/mes`}
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="mt-8 w-full flex flex-col items-end">
							<div className="text-gray-600 text-sm mb-1">{configuratorContent.initialPayment}</div>
							<div className="text-2xl font-bold text-blue-600 mb-2">
								{currencyFormatter.format(totalSinIVA)}
							</div>
							<div className="text-gray-600 text-sm mb-1">
								Pago {showAnnual ? configuratorContent.paymentTypeAnnual : configuratorContent.paymentTypeMonthly} (soporte)
							</div>
							<div className="text-2xl font-bold text-blue-700">
								{showAnnual
									? `${numberFormatter.format(totalMantenimiento)}€/año`
									: `${numberFormatter.format(totalMantenimiento)}€/mes`}
							</div>
						</div>
                        {/* New CTA Card */}
                        <div className="mt-8 w-full">
                            <Link href="/calculadora-ahorro" className="block">
                                <div className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg text-center transition-colors duration-200">
                                    Calcula tu Ahorro
                                </div>
                            </Link>
                        </div>
					</div>
					{/* Mobile presupuesto modal */}
					{showPresupuestoMobile && (
						<div className="fixed inset-0 z-40 flex items-end justify-center md:hidden">
							<div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity" onClick={() => setShowPresupuestoMobile(false)} />
							<div className="w-full max-w-md bg-gray-100 rounded-t-2xl p-6 text-gray-900 shadow-lg animate-fadeInUp relative z-50">
								<div className="flex justify-between items-center mb-4">
									<h3 className="text-lg font-semibold text-gray-900">{configuratorContent.budgetTitle}</h3>
									<button className="text-gray-600 text-sm font-semibold" onClick={() => setShowPresupuestoMobile(false)}>{configuratorContent.hideBudgetButton}</button>
								</div>
								{/* Mensual/Anual selector for mobile modal */}
								<div className="flex gap-2 mb-4">
									<button
										type="button"
										className={`w-1/2 px-3 py-1 rounded-full border text-sm font-semibold transition-colors ${!showAnnual ? 'bg-blue-100 border-blue-400 text-blue-700' : 'bg-white border-gray-300 text-gray-700'}`}
										onClick={() => setShowAnnual(false)}
									>
										{configuratorContent.monthlyButton}
									</button>
									<button
										type="button"
										className={`w-1/2 px-3 py-1 rounded-full border text-sm font-semibold transition-colors flex items-center justify-center ${showAnnual ? 'bg-blue-100 border-blue-400 text-blue-700' : 'bg-white border-gray-300 text-blue-700'}`}
										onClick={() => setShowAnnual(true)}
									>
										<span>{configuratorContent.annualButton}</span>
										<span className="ml-2 text-xs text-blue-700 font-bold">(-20%)</span>
									</button>
								</div>
								<ul className="text-gray-700 text-sm w-full mb-4">
									{coreModules.map((mod) => (
										<li key={mod.name} className="flex justify-between items-center mb-1">
											<span>{mod.name} (Core)</span>
											<span className="font-semibold">{numberFormatter.format(mod.price)}€</span>
										</li>
									))}
									{selectedExtras.map((name) => {
										const mod = extraModules.find((m) => m.name === name);
										return mod ? (
											<li key={mod.name} className="flex justify-between items-center mb-1">
												<span>{mod.name}</span>
												<span className="font-semibold">{numberFormatter.format(mod.price)}€</span>
											</li>
										) : null;
									})}
								</ul>
								<div className="flex flex-col gap-2 text-sm mb-4">
									<div className="flex justify-between items-center">
										<span>{configuratorContent.basicCoreMaintenance}</span>
										{showAnnual ? (
											<span className="flex items-center gap-2 font-bold">
												<span className="text-gray-600 line-through decoration-red-700 text-xs font-medium">{numberFormatter.format(400 * 12)}€</span>
												{numberFormatter.format(4000)}€/año
											</span>
										) : (
											<span className="font-semibold">{numberFormatter.format(400)}€/mes</span>
										)}
									</div>
									{selectedExtras.length > 0 && (
										<div className="flex justify-between items-center">
											<span>{configuratorContent.extraMaintenancePrefix}{selectedExtras.length} {selectedExtras.length > 1 ? configuratorContent.extraMaintenanceSuffixPlural : configuratorContent.extraMaintenanceSuffixSingular}</span>
											{showAnnual ? (
												<span className="flex items-center gap-2 font-semibold">
													<span className="text-gray-600 line-through decoration-red-700 text-xs">{numberFormatter.format(60 * selectedExtras.length * 12)}€</span>
													{numberFormatter.format(600 * selectedExtras.length)}€/año
												</span>
											) : (
												<span className="font-semibold">{numberFormatter.format(60 * selectedExtras.length)}€/mes</span>
											)}
										</div>
									)}
									<div className="flex justify-between items-center font-bold mt-2">
										<span>{configuratorContent.totalMaintenance}</span>
										{showAnnual ? (
											<span className="flex items-center gap-2">
												<span className="text-gray-600 line-through decoration-red-700 text-xs">{numberFormatter.format((400 + 60 * selectedExtras.length) * 12)}€</span>
												{currencyFormatter.format(totalMantenimiento)}/año
											</span>
										) : (
											<span>{currencyFormatter.format(totalMantenimiento)}/mes</span>
										)}
									</div>
								</div>
								<div className="w-full flex flex-col items-end">
									<div className="text-gray-600 text-sm mb-1">Pago inicial</div>
									<div className="text-2xl font-bold text-black mb-2">
										{currencyFormatter.format(totalSinIVA)}
									</div>
									<div className="text-gray-600 text-sm mb-1">
										Suscripción {showAnnual ? "anual" : "mensual"}
									</div>
									<div className="text-2xl font-bold text-black">
										{showAnnual
											? `${currencyFormatter.format(totalMantenimiento)}/año`
											: `${currencyFormatter.format(totalMantenimiento)}/mes`}
									</div>
								</div>
                {/* Mobile Savings Results Display */}
                <div className="mt-8 w-full flex flex-col items-end text-right">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {configuratorContent.savingsEstimationTitle}
                  </h3>
                  <div className="text-gray-600 text-sm mb-1">{configuratorContent.estimatedAnnualSavings}</div>
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {currencyFormatter.format(ahorroAnualEstimado)}
                  </div>
                  <div className="text-gray-600 text-sm mb-1">{configuratorContent.agentAnnualCost}</div>
                  <div className="text-2xl font-bold text-red-600 mb-2">
                    {currencyFormatter.format(totalCosteAnualAgente)}
                  </div>
                  <div className="text-gray-600 text-sm mb-1">{configuratorContent.netAnnualSavings}</div>
                  <div className="text-2xl font-bold text-blue-800 mb-2">
                    {currencyFormatter.format(netSavingsAnual)}
                  </div>
                  <div className="text-gray-600 text-sm mb-1">{configuratorContent.paybackPeriod}</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {paybackPeriodMonths > 0 && paybackPeriodMonths !== Infinity ? `${numberFormatter.format(paybackPeriodMonths)}` : 'N/A'}
                  </div>
                </div>
							</div>
						</div>
					)}
				</div>
				{/* Fixed bottom bar for mobile */}
				<div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 px-4 py-3 flex md:hidden items-center justify-between shadow-lg">
					<div className="flex flex-col">
						<span className="text-xs text-gray-600">{configuratorContent.initialPayment}</span>
						<span className="text-lg font-bold text-blue-600">{currencyFormatter.format(totalSinIVA)}</span>
					</div>
					<div className="flex flex-col mx-4">
						<span className="text-xs text-gray-600">{configuratorContent.initialPayment} {showAnnual ? configuratorContent.paymentTypeAnnual : configuratorContent.paymentTypeMonthly}</span>
						<span className="text-lg font-bold text-blue-700">{showAnnual ? `${currencyFormatter.format(totalMantenimiento)}/año` : `${currencyFormatter.format(totalMantenimiento)}/mes`}</span>
					</div>
					<button
						type="button"
						className="text-sm font-semibold text-blue-700 bg-blue-100 px-4 py-2 rounded-full shadow"
						onClick={() => setShowPresupuestoMobile((v) => !v)}
					>
						{showPresupuestoMobile ? configuratorContent.mobileHide : configuratorContent.mobileShow}
					</button>
				</div>
			</div>
	);
}
