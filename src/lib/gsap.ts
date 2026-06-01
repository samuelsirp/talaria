"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";

// Register once. These modules are client-only ("use client"), so this never
// runs during SSR.
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin, SplitText);

export { gsap, useGSAP, ScrollTrigger, ScrambleTextPlugin, SplitText };
