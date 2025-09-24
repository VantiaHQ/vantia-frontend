"use client";
import React, { useState } from "react";

const coreModules = [
	{
		name: "ChatBot",
		price: 1000,
		description:
			"Permite responder preguntas frecuentes de manera ágil y automatizada, liberando recursos humanos y mejorando la experiencia de los usuarios.",
	},
	{
		name: "RAG",
		price: 1500,
		description:
			"Accede a las bases de conocimiento de la empresa para ofrecer respuestas ajustadas al contexto, asegurando precisión en la información entregada.",
	},
];

const extraModules = [
	{
		name: "Captación",
		price: 500,
		description:
			"Diseñado para atraer y cualificar prospectos, facilitando la integración con los sistemas de marketing y ventas.",
	},
	{
		name: "Gestión de Citas",
		price: 500,
		description:
			"Permite automatizar reservas y coordinación de agendas, optimizando la planificación con clientes y empleados.",
	},
	{
		name: "Notificaciones",
		price: 500,
		description:
			"Envía alertas, recordatorios y actualizaciones en tiempo real a través de múltiples canales de comunicación.",
	},
	{
		name: "GenAI",
		price: 500,
		description:
			"Genera contenido dinámico y personalizado, creando interacciones más naturales y cercanas con los usuarios.",
	},
	{
		name: "Generación de Referral Checkout URL",
		price: 500,
		description:
			"Permite crear enlaces únicos de referencia para pagos o procesos de compra, potenciando programas de recomendación y ventas directas.",
	},
	{
		name: "Análisis de Sentimiento",
		price: 500,
		description:
			"Detecta la emoción detrás de cada interacción, clasificando el tono de los mensajes para mejorar la atención y la estrategia comunicativa.",
	},
	{
		name: "Análisis Histórico",
		price: 500,
		description:
			"Recopila y estudia datos de interacciones pasadas para identificar tendencias, patrones de comportamiento y oportunidades de optimización.",
	},
	{
		name: "OCR",
		price: 500,
		description:
			"Transforma texto en imágenes, documentos escaneados o PDFs en datos digitales estructurados, agilizando procesos documentales y reduciendo la intervención manual.",
	},
];

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
		<button
			type="button"
			onClick={() => !disabled && onClick()}
			className={`group w-full text-left rounded-xl border-2 border-blue-200 p-0 shadow-none transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 ${
				checked
					? "bg-blue-50 border-blue-500"
					: "hover:border-blue-400 bg-white"
			} ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
			tabIndex={0}
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
					<button
						type="button"
						className="text-xs text-gray-600 underline mt-1 focus:outline-none"
						onClick={(e) => {
							e.stopPropagation();
							setExpanded((v) => !v);
						}}
						tabIndex={-1}
					>
						{expanded ? "Ocultar descripción" : "Ver descripción"}
					</button>
					{expanded && (
						<div className="text-gray-700 text-sm mt-2">
							{mod.description}
						</div>
					)}
				</div>
			</div>
		</button>
	);
}

export default function ConfigurarAgente() {
	const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
	const [showAnnual, setShowAnnual] = useState(true);

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

		// Mobile state for presupuesto modal
		const [showPresupuestoMobile, setShowPresupuestoMobile] = useState(false);

		return (
			<div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
				<div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 flex flex-row gap-8 md:flex-row flex-col">
					{/* Main section: full width on mobile */}
					<div className="flex-1 w-full md:w-auto">
						<p className="text-sm text-gray-700 uppercase">
							Agente modular
						</p>
						<h1 className="text-3xl font-bold mb-4 text-gray-900">
							Configurador
						</h1>
						<p className="mb-6 text-gray-700">
							Personaliza tu agente seleccionando los módulos que mejor se adapten a las necesidades de tu empresa.
						</p>
						<div className="mb-6">
							<h2 className="text-xl font-semibold text-gray-800 mb-2">
								Módulos Core
							</h2>
							<p className="text-sm mb-6 text-gray-700">
								Los módulos core son
								esenciales y no pueden desactivarse.
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
								<h2 className="text-xl font-semibold text-gray-800">
									Módulos Extra
								</h2>
								<span className="text-sm text-blue-700 font-semibold">
									(500€/módulo)
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
							<h3 className="text-lg font-semibold text-gray-800 mb-4">
								Presupuesto
							</h3>
							<ul className="text-gray-700 text-sm w-full">
								{coreModules.map((mod) => (
									<li key={mod.name} className="flex justify-between items-center mb-1">
										<span>{mod.name}</span>
										<span className="font-semibold">{mod.price}€</span>
									</li>
								))}
								{selectedExtras.map((name) => {
									const mod = extraModules.find((m) => m.name === name);
									return mod ? (
										<li key={mod.name} className="flex justify-between items-center mb-1">
											<span>{mod.name}</span>
											<span className="font-semibold">{mod.price}€</span>
										</li>
									) : null;
								})}
							</ul>
							<div className="mt-6">
								<h4 className="text-base font-semibold text-gray-800 mb-2">
									Soporte y Mantenimiento
								</h4>
								<div className="flex gap-2 mb-2">
									<button
										type="button"
										className={`w-1/2 px-3 py-1 rounded-full border text-sm font-semibold transition-colors ${showAnnual ? 'bg-blue-100 border-blue-400 text-blue-700' : 'bg-white border-gray-300 text-gray-700'}`}
										onClick={() => setShowAnnual(true)}
									>
										Anual
									</button>
									<button
										type="button"
										className={`w-1/2 px-3 py-1 rounded-full border text-sm font-semibold transition-colors ${!showAnnual ? 'bg-blue-100 border-blue-400 text-blue-700' : 'bg-white border-gray-300 text-gray-700'}`}
										onClick={() => setShowAnnual(false)}
									>
										Mensual
									</button>
								</div>
								<div className="flex flex-col gap-2 text-sm">
									<div className="flex justify-between items-center">
										<span>Básico (Core)</span>
										<span className="font-semibold">{showAnnual ? '4.000€/año' : '400€/mes'}</span>
									</div>
									{selectedExtras.length > 0 && (
										<div className="flex justify-between items-center">
											<span>Extra ({selectedExtras.length} módulo{selectedExtras.length > 1 ? 's' : ''})</span>
											<span className="font-semibold">{showAnnual ? `${600 * selectedExtras.length}€/año` : `${60 * selectedExtras.length}€/mes`}</span>
										</div>
									)}
									<div className="flex justify-between items-center font-bold mt-2">
										<span>Total mantenimiento</span>
										<span>
											{showAnnual
												? `${totalMantenimiento}€/año`
												: `${totalMantenimiento}€/mes`}
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="mt-8 w-full flex flex-col items-end">
							<div className="text-gray-600 text-sm mb-1">Pago inicial</div>
							<div className="text-2xl font-bold text-blue-600 mb-2">
								{totalSinIVA}€
							</div>
							<div className="text-gray-600 text-sm mb-1">
								Pago {showAnnual ? "anual" : "mensual"} (soporte)
							</div>
							<div className="text-2xl font-bold text-blue-700">
								{showAnnual
									? `${totalMantenimiento}€/año`
									: `${totalMantenimiento}€/mes`}
							</div>
						</div>
					</div>
					{/* Mobile presupuesto modal */}
					{showPresupuestoMobile && (
						<div className="fixed inset-0 z-40 flex items-end justify-center md:hidden">
							<div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity" onClick={() => setShowPresupuestoMobile(false)} />
							<div className="w-full max-w-md bg-gray-100 rounded-t-2xl p-6 text-gray-900 shadow-lg animate-fadeInUp relative z-50">
								<div className="flex justify-between items-center mb-4">
									<h3 className="text-lg font-semibold text-gray-800">Presupuesto</h3>
									<button className="text-blue-700 text-sm font-semibold" onClick={() => setShowPresupuestoMobile(false)}>Ocultar</button>
								</div>
								<ul className="text-gray-700 text-sm w-full mb-4">
									{coreModules.map((mod) => (
										<li key={mod.name} className="flex justify-between items-center mb-1">
											<span>{mod.name}</span>
											<span className="font-semibold">{mod.price}€</span>
										</li>
									))}
									{selectedExtras.map((name) => {
										const mod = extraModules.find((m) => m.name === name);
										return mod ? (
											<li key={mod.name} className="flex justify-between items-center mb-1">
												<span>{mod.name}</span>
												<span className="font-semibold">{mod.price}€</span>
											</li>
										) : null;
									})}
								</ul>
								<div className="flex flex-col gap-2 text-sm mb-4">
									<div className="flex justify-between items-center">
										<span>Básico (Core)</span>
										<span className="font-semibold">{showAnnual ? '4.000€/año' : '400€/mes'}</span>
									</div>
									{selectedExtras.length > 0 && (
										<div className="flex justify-between items-center">
											<span>Extra ({selectedExtras.length} módulo{selectedExtras.length > 1 ? 's' : ''})</span>
											<span className="font-semibold">{showAnnual ? `${600 * selectedExtras.length}€/año` : `${60 * selectedExtras.length}€/mes`}</span>
										</div>
									)}
									<div className="flex justify-between items-center font-bold mt-2">
										<span>Total mantenimiento</span>
										<span>
											{showAnnual
												? `${totalMantenimiento}€/año`
												: `${totalMantenimiento}€/mes`}
										</span>
									</div>
								</div>
								<div className="w-full flex flex-col items-end">
									<div className="text-gray-600 text-sm mb-1">Pago inicial</div>
									<div className="text-2xl font-bold text-blue-600 mb-2">
										{totalSinIVA}€
									</div>
									<div className="text-gray-600 text-sm mb-1">
										Pago {showAnnual ? "anual" : "mensual"} (soporte)
									</div>
									<div className="text-2xl font-bold text-blue-700">
										{showAnnual
											? `${totalMantenimiento}€/año`
											: `${totalMantenimiento}€/mes`}
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
				{/* Fixed bottom bar for mobile */}
				<div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 px-4 py-3 flex md:hidden items-center justify-between shadow-lg">
					<div className="flex flex-col">
						<span className="text-xs text-gray-600">Pago inicial</span>
						<span className="text-lg font-bold text-blue-600">{totalSinIVA}€</span>
					</div>
					<div className="flex flex-col mx-4">
						<span className="text-xs text-gray-600">Pago {showAnnual ? "anual" : "mensual"}</span>
						<span className="text-lg font-bold text-blue-700">{showAnnual ? `${totalMantenimiento}€/año` : `${totalMantenimiento}€/mes`}</span>
					</div>
					<button
						type="button"
						className="text-sm font-semibold text-blue-700 bg-blue-100 px-4 py-2 rounded-full shadow"
						onClick={() => setShowPresupuestoMobile((v) => !v)}
					>
						{showPresupuestoMobile ? "Ocultar" : "Mostrar"}
					</button>
				</div>
			</div>
	);
}
