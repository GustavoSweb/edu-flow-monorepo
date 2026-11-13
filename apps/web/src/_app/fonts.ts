import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";

export const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
export const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap" });
export const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const fontVariables = [bricolage.variable, instrument.variable, jetbrains.variable].join(" ");
