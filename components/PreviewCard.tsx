'use client';

/* eslint-disable @next/next/no-img-element */

import { CardVariables } from '@/models/types';
import { applyOpacity } from '@/utils/colors';
import { sampleData } from '@/models/presets';

interface PreviewCardProps {
  vars: CardVariables;
  layout: 'center' | 'left';
  side: 'front' | 'back';
  bounceKey: number;
  reduceMotion: boolean;
  frontField: string;
  backField: string;
  hintField: string;
  imageField: string;
  extraField: string;
  showImage: boolean;
  showHint: boolean;
  showExtra: boolean;
  includeQuestionOnBack: boolean;
}

/**
 * Preview card component that renders a visual representation of the Anki card
 */
export function PreviewCard({
  vars,
  layout,
  side,
  bounceKey,
  reduceMotion,
  frontField,
  backField,
  hintField,
  imageField,
  extraField,
  showImage,
  showHint,
  showExtra,
  includeQuestionOnBack,
}: PreviewCardProps) {
  const lay = layout === 'left' ? 'items-start text-left' : 'items-center text-center';
  const isFront = side === 'front';

  return (
    <div
      key={bounceKey}
      className={`w-full flex ${lay}`}
      style={{
        backgroundColor: applyOpacity(vars.bg, vars.bgOpacity),
        color: vars.fg,
        fontFamily: vars.font,
        fontSize: vars.baseSize,
        lineHeight: vars.lineHeight,
        padding: vars.padding,
        borderRadius: vars.radius,
        maxWidth: vars.cardWidth,
        border: `${vars.strokeWidth}px solid ${vars.strokeColor}`,
        boxShadow: vars.shadow
          ? `0 12px 32px ${vars.shadowColor}, 0 1px 1px rgba(0,0,0,0.06)`
          : 'none',
        margin: '0 auto',
        animation: reduceMotion ? 'none' : 'cardBounce 420ms cubic-bezier(.22,.61,.36,1)',
        transformOrigin: 'center bottom',
      }}
    >
      <div className="w-full">
        {vars.showHeader && (
          <div className="mb-2 font-semibold tracking-wide opacity-80">Biology Deck</div>
        )}

        {isFront ? (
          <div
            style={{
              color: vars.accent,
              fontWeight: vars.qWeight,
              fontSize: vars.baseSize * 1.1,
            }}
          >
            {sampleData[frontField as keyof typeof sampleData] || `{{${frontField}}}`}
          </div>
        ) : (
          includeQuestionOnBack && (
            <>
              <div
                style={{
                  color: vars.accent,
                  fontWeight: vars.qWeight,
                  fontSize: vars.baseSize * 1.1,
                }}
              >
                {sampleData[frontField as keyof typeof sampleData] || `{{${frontField}}}`}
              </div>
              <div
                className="my-3 h-px w-full"
                style={{
                  background: 'linear-gradient(90deg,transparent,rgba(0,0,0,.12),transparent)',
                }}
              />
            </>
          )
        )}

        {isFront ? (
          <>
            {showHint && (
              <div className="mt-2 italic opacity-85">
                Hint: {sampleData[hintField as keyof typeof sampleData] || `{{${hintField}}}`}
              </div>
            )}
            {showImage && (
              <div className="mt-3">
                <img
                  src={sampleData[imageField as keyof typeof sampleData]}
                  alt="preview"
                  style={{ borderRadius: Math.max(0, vars.radius - 6) }}
                />
              </div>
            )}
          </>
        ) : (
          <>
            <div className="answer" style={{ fontWeight: vars.aWeight }}>
              {sampleData[backField as keyof typeof sampleData] || `{{${backField}}}`}
            </div>
            {showImage && (
              <div className="mt-3">
                <img
                  src={sampleData[imageField as keyof typeof sampleData]}
                  alt="preview"
                  style={{ borderRadius: Math.max(0, vars.radius - 6) }}
                />
              </div>
            )}
            {showHint && (
              <div className="mt-2 italic opacity-85">
                Hint: {sampleData[hintField as keyof typeof sampleData] || `{{${hintField}}}`}
              </div>
            )}
            {showExtra && (
              <div className="mt-3 p-3 rounded-xl" style={{ background: 'rgba(0,0,0,.04)' }}>
                {sampleData[extraField as keyof typeof sampleData] || `{{${extraField}}}`}
              </div>
            )}
          </>
        )}

        {vars.showFooter && <div className="mt-3 opacity-70 text-sm">tags: geography, capitals</div>}
      </div>
    </div>
  );
}
