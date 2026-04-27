"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BASE = "#5C544A";
const ACCENT = "#64FFAE";
const DASH_LEN = 14;
const DASH_GAP = 9;
const DASH_W = 3;
const ARROW_HEAD_PTS = "-11,-6 0,0 -11,6";

type Dash = { el: SVGRectElement; midDist: number };

type ArrowState = {
  totalLen: number;
  dashes: Dash[];
  head: SVGPolylineElement;
};

function buildArrow(
  svg: SVGSVGElement,
  pathEl: SVGPathElement,
  ballEl: SVGCircleElement,
  glowEl: SVGCircleElement,
  waypoints: [number, number][],
): ArrowState {
  const d = waypoints
    .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`)
    .join(" ");
  pathEl.setAttribute("d", d);
  const totalLen = pathEl.getTotalLength();

  const pitch = DASH_LEN + DASH_GAP;
  const dashes: Dash[] = [];
  let segStartDist = 0;

  for (let seg = 0; seg < waypoints.length - 1; seg++) {
    const [x1, y1] = waypoints[seg];
    const [x2, y2] = waypoints[seg + 1];
    const segLen = Math.hypot(x2 - x1, y2 - y1);

    const isLastSeg = seg === waypoints.length - 2;
    const finalGap = isLastSeg ? 20 : 0;
    const effectiveLen = segLen - finalGap;
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

    for (let s = 0; s + DASH_LEN / 2 <= effectiveLen; s += pitch) {
      const dashEnd = Math.min(s + DASH_LEN, segLen);
      const t1 = s / segLen;
      const t2 = dashEnd / segLen;
      const cx = x1 + ((x2 - x1) * (t1 + t2)) / 2;
      const cy = y1 + ((y2 - y1) * (t1 + t2)) / 2;
      const len = dashEnd - s;

      const rect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect",
      );
      rect.setAttribute("x", String(-len / 2));
      rect.setAttribute("y", String(-DASH_W / 2));
      rect.setAttribute("width", String(len));
      rect.setAttribute("height", String(DASH_W));
      rect.setAttribute("rx", "1.5");
      rect.setAttribute("fill", BASE);
      rect.setAttribute("transform", `translate(${cx},${cy}) rotate(${angle})`);
      svg.insertBefore(rect, ballEl);

      dashes.push({ el: rect, midDist: segStartDist + s + (dashEnd - s) / 2 });
    }

    segStartDist += segLen;
  }

  const [ex, ey] = waypoints[waypoints.length - 1];
  const [nx, ny] = waypoints[waypoints.length - 2];
  const headAngle = Math.atan2(ey - ny, ex - nx) * (180 / Math.PI);
  const head = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polyline",
  );
  head.setAttribute("points", ARROW_HEAD_PTS);
  head.setAttribute("fill", "none");
  head.setAttribute("stroke", BASE);
  head.setAttribute("stroke-width", String(DASH_W));
  head.setAttribute("stroke-linecap", "round");
  head.setAttribute("stroke-linejoin", "round");
  head.setAttribute("transform", `translate(${ex},${ey}) rotate(${headAngle})`);
  svg.insertBefore(head, ballEl);

  const startPt = pathEl.getPointAtLength(0);
  ballEl.setAttribute("cx", String(startPt.x));
  ballEl.setAttribute("cy", String(startPt.y));
  glowEl.setAttribute("cx", String(startPt.x));
  glowEl.setAttribute("cy", String(startPt.y));

  return { totalLen, dashes, head };
}

function updateArrow(
  arrow: ArrowState,
  pathEl: SVGPathElement,
  ballEl: SVGCircleElement,
  glowEl: SVGCircleElement,
  progress: number,
) {
  const dist = progress * arrow.totalLen;
  const pt = pathEl.getPointAtLength(dist);
  ballEl.setAttribute("cx", String(pt.x));
  ballEl.setAttribute("cy", String(pt.y));
  glowEl.setAttribute("cx", String(pt.x));
  glowEl.setAttribute("cy", String(pt.y));

  const op = progress > 0 && progress < 1 ? "1" : "0";
  ballEl.setAttribute("opacity", op);
  glowEl.setAttribute("opacity", op);

  const lastDash = arrow.dashes[arrow.dashes.length - 1];
  const headThreshold = lastDash ? lastDash.midDist : arrow.totalLen * 0.95;

  arrow.dashes.forEach(({ el, midDist }) => {
    el.setAttribute("fill", midDist <= dist ? ACCENT : BASE);
  });
  arrow.head.setAttribute("stroke", dist >= headThreshold ? ACCENT : BASE);
}

function teardownArrow(arrow: ArrowState) {
  arrow.dashes.forEach(({ el }) => el.remove());
  arrow.head.remove();
}

export default function FlowingArrow() {
  const svgRef = useRef<SVGSVGElement>(null);
  const p1Ref = useRef<SVGPathElement>(null);
  const p2Ref = useRef<SVGPathElement>(null);
  const b1Ref = useRef<SVGCircleElement>(null);
  const b2Ref = useRef<SVGCircleElement>(null);
  const g1Ref = useRef<SVGCircleElement>(null);
  const g2Ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const container = svg.parentElement;
    if (!container) return;

    let arrow1: ArrowState | null = null;
    let arrow2: ArrowState | null = null;
    let st: ScrollTrigger | null = null;

    function build() {
      if (arrow1) teardownArrow(arrow1);
      if (arrow2) teardownArrow(arrow2);
      st?.kill();
      arrow1 = arrow2 = null;

      const svgEl = svgRef.current;
      if (!svgEl) return;

      const p1 = p1Ref.current;
      const p2 = p2Ref.current;
      const b1 = b1Ref.current;
      const b2 = b2Ref.current;
      const g1 = g1Ref.current;
      const g2 = g2Ref.current;
      if (!p1 || !p2 || !b1 || !b2 || !g1 || !g2) return;

      const cRect = container!.getBoundingClientRect();
      if (cRect.width === 0 || cRect.height === 0) return;

      const womanColEl = document.getElementById("fp-woman-col");
      const frameEl = document.getElementById("fp-frame");
      const convertingTextEl = document.getElementById("fp-converting-text");
      const row3El = document.getElementById("fp-row3");
      const manColEl = document.getElementById("fp-man-col");
      const text1El = document.getElementById("fp-text1");
      const text3El = document.getElementById("fp-text3");
      const sendBtnEl = document.getElementById("fp-send-btn");
      const cursorEl = document.getElementById("fp-cursor");

      if (
        !womanColEl ||
        !frameEl ||
        !convertingTextEl ||
        !row3El ||
        !manColEl ||
        !text1El ||
        !text3El ||
        !sendBtnEl ||
        !cursorEl
      )
        return;

      [text1El, convertingTextEl, text3El].forEach((el) => {
        el.style.opacity = "0";
      });
      frameEl.style.opacity = "0";
      sendBtnEl.style.transition = "all 0.3s ease";
      cursorEl.style.transition = "all 0.3s ease";

      setTimeout(() => {
        [text1El, convertingTextEl, text3El].forEach((el) => {
          el.style.transition = "color 0.8s ease, opacity 0.8s ease";
        });
        frameEl.style.transition = "opacity 0.6s ease";
      }, 50);

      function rel(el: Element) {
        const r = el.getBoundingClientRect();
        return {
          top: r.top - cRect.top,
          left: r.left - cRect.left,
          right: r.right - cRect.left,
          bottom: r.bottom - cRect.top,
          cx: (r.left + r.right) / 2 - cRect.left,
          cy: (r.top + r.bottom) / 2 - cRect.top,
          w: r.width,
          h: r.height,
        };
      }

      const womanCol = rel(womanColEl);
      const frame = rel(frameEl);
      const convertingText = rel(convertingTextEl);
      const manCol = rel(manColEl);
      const text1 = rel(text1El);
      const text3 = rel(text3El);

      const isMobile = window.innerWidth < 1024;

      const a1sx = womanCol.right - womanCol.w * 0.25;
      const a1sy = womanCol.top + womanCol.h * 0.35;
      const a1ex = frame.cx;
      const a1ey = frame.top - 20;
      const a1ax = Math.max(a1sx, a1ex) + 100;
      const a1ay = a1sy + (a1ey - a1sy) * 0.3;

      const a2sx = frame.cx;
      const a2sy = frame.bottom + 20;
      const a2ex = manCol.cx;
      const a2ey = manCol.top - 20;

      arrow1 = buildArrow(svgEl, p1, b1, g1, [
        [a1sx, a1sy],
        [a1ax, a1ay],
        [a1ex, a1ey],
      ]);
      arrow2 = buildArrow(svgEl, p2, b2, g2, [
        [a2sx, a2sy],
        [a2ex, a2ey],
      ]);

      updateArrow(arrow1, p1, b1, g1, 0);
      updateArrow(arrow2, p2, b2, g2, 0);
      b1.setAttribute("opacity", "0");
      b2.setAttribute("opacity", "0");
      g1.setAttribute("opacity", "0");
      g2.setAttribute("opacity", "0");

      const baseColor = "#78716C";
      const activeColor = "#FFFFFF";

      st = ScrollTrigger.create({
        trigger: container,
        start: isMobile ? "top 10%" : "top 20%",
        end: isMobile ? "bottom 90%" : "bottom 80%",
        scrub: 1,
        onUpdate(self) {
          const p = self.progress;

          if (p < 0.15) {
            const clickP = p / 0.15;
            cursorEl.style.transform = `scale(${1 - clickP * 0.2})`;
            cursorEl.style.opacity = "1";
            if (clickP > 0.8) {
              sendBtnEl.style.backgroundColor = ACCENT;
              sendBtnEl.style.color = "#000000";
            } else {
              sendBtnEl.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
              sendBtnEl.style.color = "#FFFFFF";
            }
          } else {
            cursorEl.style.transform = "scale(1)";
            cursorEl.style.opacity = "0";
            sendBtnEl.style.backgroundColor = ACCENT;
            sendBtnEl.style.color = "#000000";
          }

          text1El.style.color = p < 0.48 ? activeColor : baseColor;
          convertingTextEl.style.color =
            p >= 0.48 && p < 0.95 ? activeColor : baseColor;
          text3El.style.color = p >= 0.95 ? activeColor : baseColor;

          text1El.style.opacity = p > 0.14 ? "1" : "0";
          
          const secondTrigger = 0.55;
          convertingTextEl.style.opacity = p >= secondTrigger ? "1" : "0";
          frameEl.style.opacity = p >= secondTrigger ? "1" : "0";
          text3El.style.opacity = p >= 0.95 ? "1" : "0";

          const ballP = p < 0.15 ? 0 : (p - 0.15) / 0.85;

          if (ballP <= 0.5) {
            b1.setAttribute("opacity", ballP > 0 ? "1" : "0");
            g1.setAttribute("opacity", ballP > 0 ? "1" : "0");
            b2.setAttribute("opacity", "0");
            g2.setAttribute("opacity", "0");
            updateArrow(arrow1!, p1!, b1, g1, ballP / 0.5);
          } else {
            updateArrow(arrow1!, p1!, b1, g1, 1);
            b1.setAttribute("opacity", "0");
            g1.setAttribute("opacity", "0");
            b2.setAttribute("opacity", "1");
            g2.setAttribute("opacity", "1");
            updateArrow(arrow2!, p2!, b2, g2, (ballP - 0.5) / 0.5);
          }
        },
      });
    }

    build();
    const obs = new ResizeObserver(build);
    obs.observe(container);

    return () => {
      if (arrow1) teardownArrow(arrow1);
      if (arrow2) teardownArrow(arrow2);
      st?.kill();
      obs.disconnect();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="ball-glow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter
          id="ambient-glow"
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      <path ref={p1Ref} fill="none" stroke="none" />
      <path ref={p2Ref} fill="none" stroke="none" />

      <circle
        ref={g1Ref}
        r="40"
        fill="#64FFAE"
        fillOpacity="0.08"
        filter="url(#ambient-glow)"
      />
      <circle
        ref={g2Ref}
        r="40"
        fill="#64FFAE"
        fillOpacity="0.08"
        filter="url(#ambient-glow)"
      />

      <circle
        ref={b1Ref}
        r="7"
        fill="#64FFAE"
        filter="url(#ball-glow)"
        opacity="0"
      />
      <circle
        ref={b2Ref}
        r="7"
        fill="#64FFAE"
        filter="url(#ball-glow)"
        opacity="0"
      />
    </svg>
  );
}
