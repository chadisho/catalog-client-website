'use client';

import { useMemo } from 'react';
let DOMPurify: any = null;

if (typeof window !== 'undefined') {
  DOMPurify = require('dompurify');
}
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

type ProductDescriptionProps = {
  description: string;
  expanded: boolean;
  onToggle: () => void;
  moreLabel: string;
  lessLabel: string;
};

type QuillDelta = {
  ops: unknown[];
};

type ParsedDescription =
  | {
      mode: 'text';
      text: string;
    }
  | {
      mode: 'html';
      html: string;
      plainTextLength: number;
    };

const TEXT_COLLAPSE_LENGTH = 180;
const RICH_TEXT_COLLAPSE_LENGTH = 240;

function parseQuillDelta(value: string): QuillDelta | null {
  try {
      const parsed = JSON.parse(value) as unknown;

    if (Array.isArray(parsed)) {
      return {
        ops: parsed,
      };
    }

    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'ops' in parsed &&
      Array.isArray((parsed as QuillDelta).ops)
    ) {
      return parsed as QuillDelta;
    }

    return null;
  } catch {
    return null;
  }
}

function isLikelyHtml(value: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

function getPlainTextLengthFromHtml(html: string): number {
  const withoutTags = html
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();

  return withoutTags.length;
}

function parseDescription(rawDescription: string): ParsedDescription {
  const quillDelta = parseQuillDelta(rawDescription);

  if (quillDelta) {
    const converter = new QuillDeltaToHtmlConverter(quillDelta.ops as never[], {
      multiLineParagraph: false,
    });

    const htmlRaw = converter.convert();
    const html = DOMPurify ? DOMPurify.sanitize(htmlRaw) : htmlRaw;

    return {
      mode: 'html',
      html,
      plainTextLength: getPlainTextLengthFromHtml(html),
    };
  }

  if (isLikelyHtml(rawDescription)) {
    const html = DOMPurify ? DOMPurify.sanitize(rawDescription) : rawDescription;

    return {
      mode: 'html',
      html,
      plainTextLength: getPlainTextLengthFromHtml(html),
    };
  }

  return {
    mode: 'text',
    text: rawDescription,
  };
}

export default function ProductDescription({
  description,
  expanded,
  onToggle,
  moreLabel,
  lessLabel,
}: ProductDescriptionProps) {
  const parsed = useMemo(() => parseDescription(description), [description]);

  if (parsed.mode === 'text') {
    const hasLongText = parsed.text.length > TEXT_COLLAPSE_LENGTH;
    const descriptionText =
      hasLongText && !expanded ? `${parsed.text.slice(0, TEXT_COLLAPSE_LENGTH)}...` : parsed.text;

    return (
      <>
        <p className="text-sm leading-7 text-text/85">{descriptionText}</p>
        {hasLongText ? (
          <button type="button" onClick={onToggle} className="text-sm font-semibold text-primary">
            {expanded ? lessLabel : moreLabel}
          </button>
        ) : null}
      </>
    );
  }

  const hasLongRichText = parsed.plainTextLength > RICH_TEXT_COLLAPSE_LENGTH;

  return (
    <>
      <div className={hasLongRichText && !expanded ? 'relative overflow-hidden' : ''}>
        <div
          className={
            hasLongRichText && !expanded
              ? 'max-h-40 overflow-hidden text-sm leading-7 text-text/85 [&_ol]:list-decimal [&_ol]:ps-5 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:ps-5'
              : 'text-sm leading-7 text-text/85 [&_ol]:list-decimal [&_ol]:ps-5 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:ps-5'
          }
          dangerouslySetInnerHTML={{ __html: parsed.html }}
        />
        {hasLongRichText && !expanded ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-secondary/20 to-transparent" />
        ) : null}
      </div>

      {hasLongRichText ? (
        <button type="button" onClick={onToggle} className="text-sm font-semibold text-primary">
          {expanded ? lessLabel : moreLabel}
        </button>
      ) : null}
    </>
  );
}