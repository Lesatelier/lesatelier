module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/buildDocx.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "buildAntwoordblad",
    ()=>buildAntwoordblad,
    "buildHandout",
    ()=>buildHandout,
    "buildLesplanformulier",
    ()=>buildLesplanformulier,
    "buildOefendocument",
    ()=>buildOefendocument
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__ = __turbopack_context__.i("[externals]/docx [external] (docx, esm_import, [project]/node_modules/docx)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
// ── Colour constants ──────────────────────────────────────────────────────────
const DARK_BLUE = '1B2A6B';
const LIGHT_BLUE = 'CADCFC';
const RED = 'CC0000';
const WHITE = 'FFFFFF';
// ── Helpers ───────────────────────────────────────────────────────────────────
function sectionHeader(text) {
    return new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Paragraph"]({
        children: [
            new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["TextRun"]({
                text,
                bold: true,
                color: WHITE,
                size: 24,
                font: 'Calibri'
            })
        ],
        shading: {
            type: __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["ShadingType"].SOLID,
            color: DARK_BLUE,
            fill: DARK_BLUE
        },
        spacing: {
            before: 200,
            after: 100
        },
        indent: {
            left: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["convertInchesToTwip"])(0.1),
            right: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["convertInchesToTwip"])(0.1)
        }
    });
}
function bodyParagraph(text, opts = {}) {
    return new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Paragraph"]({
        children: [
            new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["TextRun"]({
                text,
                bold: opts.bold,
                color: opts.color,
                size: opts.size ?? 22,
                font: 'Calibri'
            })
        ],
        spacing: {
            after: 80
        }
    });
}
function bulletParagraph(text) {
    return new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Paragraph"]({
        children: [
            new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["TextRun"]({
                text,
                size: 22,
                font: 'Calibri'
            })
        ],
        bullet: {
            level: 0
        },
        spacing: {
            after: 60
        }
    });
}
function writingLines(count) {
    return Array.from({
        length: count
    }, ()=>new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Paragraph"]({
            children: [
                new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["TextRun"]({
                    text: '________________________________________',
                    size: 22,
                    font: 'Calibri'
                })
            ],
            spacing: {
                after: 120
            }
        }));
}
function headerRow(cells) {
    return new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["TableRow"]({
        children: cells.map((text)=>new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["TableCell"]({
                children: [
                    new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Paragraph"]({
                        children: [
                            new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["TextRun"]({
                                text,
                                bold: true,
                                color: WHITE,
                                size: 20,
                                font: 'Calibri'
                            })
                        ]
                    })
                ],
                shading: {
                    type: __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["ShadingType"].SOLID,
                    color: DARK_BLUE,
                    fill: DARK_BLUE
                },
                margins: {
                    top: 80,
                    bottom: 80,
                    left: 120,
                    right: 120
                }
            }))
    });
}
function dataRow(cells, shade = false) {
    return new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["TableRow"]({
        children: cells.map((text)=>new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["TableCell"]({
                children: [
                    new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Paragraph"]({
                        children: [
                            new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["TextRun"]({
                                text,
                                size: 20,
                                font: 'Calibri'
                            })
                        ]
                    })
                ],
                shading: shade ? {
                    type: __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["ShadingType"].SOLID,
                    color: LIGHT_BLUE,
                    fill: LIGHT_BLUE
                } : undefined,
                margins: {
                    top: 60,
                    bottom: 60,
                    left: 120,
                    right: 120
                }
            }))
    });
}
function simpleBorders() {
    const b = {
        style: __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["BorderStyle"].SINGLE,
        size: 1,
        color: '999999'
    };
    return {
        top: b,
        bottom: b,
        left: b,
        right: b,
        insideHorizontal: b,
        insideVertical: b
    };
}
async function buildHandout(lesson, form) {
    const { handout } = lesson;
    const children = [];
    // Title block
    children.push(new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Paragraph"]({
        children: [
            new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["TextRun"]({
                text: handout.title,
                bold: true,
                size: 36,
                color: DARK_BLUE,
                font: 'Calibri'
            })
        ],
        alignment: __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["AlignmentType"].CENTER,
        spacing: {
            after: 100
        }
    }), new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Paragraph"]({
        children: [
            new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["TextRun"]({
                text: handout.subtitle,
                size: 22,
                font: 'Calibri',
                color: '444444'
            })
        ],
        alignment: __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["AlignmentType"].CENTER,
        spacing: {
            after: 200
        }
    }), sectionHeader('Lesdoelen'));
    handout.lesdoelen.forEach((d, i)=>children.push(bulletParagraph(`LD${i + 1}: ${d}`)));
    children.push(new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Paragraph"]({
        spacing: {
            after: 200
        }
    }));
    // Sections
    handout.sections.forEach((s)=>{
        children.push(sectionHeader(`Opdracht ${s.id}: ${s.title}`), bodyParagraph(`Tijd: ${s.time}  |  Werkvorm: ${s.grouping}`, {
            color: '555555'
        }), bodyParagraph(s.instruction));
        s.questions.forEach((q, i)=>{
            children.push(bodyParagraph(`${i + 1}. ${q}`, {
                bold: true
            }));
            children.push(...writingLines(3));
        });
        // Support hint
        if (s.support && s.support.length) {
            children.push(new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Paragraph"]({
                children: [
                    new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["TextRun"]({
                        text: '💡 Hulp nodig? ',
                        bold: true,
                        size: 20,
                        color: DARK_BLUE,
                        font: 'Calibri'
                    }),
                    new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["TextRun"]({
                        text: s.support.join(' | '),
                        size: 20,
                        font: 'Calibri'
                    })
                ],
                spacing: {
                    before: 60,
                    after: 80
                }
            }));
        }
        // Bonus
        children.push(new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Paragraph"]({
            children: [
                new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["TextRun"]({
                    text: '⭐ Bonusopdracht: ',
                    bold: true,
                    size: 20,
                    color: RED,
                    font: 'Calibri'
                }),
                new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["TextRun"]({
                    text: s.bonusopdracht,
                    size: 20,
                    font: 'Calibri'
                })
            ],
            spacing: {
                before: 60,
                after: 200
            }
        }));
    });
    // Exit ticket
    children.push(sectionHeader('Exit-ticket'));
    handout.exitTicket.forEach((q, i)=>{
        children.push(bodyParagraph(`${i + 1}. ${q}`, {
            bold: true
        }));
        children.push(...writingLines(2));
    });
    const doc = new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Document"]({
        sections: [
            {
                properties: {},
                children
            }
        ],
        styles: {
            default: {
                document: {
                    run: {
                        font: 'Calibri',
                        size: 22
                    }
                }
            }
        }
    });
    return Buffer.from(await __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Packer"].toBuffer(doc));
}
async function buildAntwoordblad(lesson, form) {
    const { antwoordblad, handout } = lesson;
    const children = [];
    children.push(new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Paragraph"]({
        children: [
            new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["TextRun"]({
                text: antwoordblad.title,
                bold: true,
                size: 36,
                color: DARK_BLUE,
                font: 'Calibri'
            })
        ],
        alignment: __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["AlignmentType"].CENTER,
        spacing: {
            after: 100
        }
    }), new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Paragraph"]({
        children: [
            new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["TextRun"]({
                text: '⚠️ UITSLUITEND VOOR DE DOCENT — NIET UITDELEN',
                bold: true,
                size: 22,
                color: RED,
                font: 'Calibri'
            })
        ],
        alignment: __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["AlignmentType"].CENTER,
        spacing: {
            after: 300
        }
    }));
    // Lesdoelen overzicht table
    children.push(sectionHeader('1. Lesdoelen — overzicht'));
    const ldTable = new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Table"]({
        width: {
            size: 100,
            type: __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["WidthType"].PERCENTAGE
        },
        borders: simpleBorders(),
        rows: [
            headerRow([
                'Nr.',
                'Lesdoel',
                'Bloom-niveau'
            ]),
            ...antwoordblad.lesdoelenOverzicht.map((ld)=>dataRow([
                    ld.nummer,
                    ld.doel,
                    ld.bloom
                ]))
        ]
    });
    children.push(ldTable, new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Paragraph"]({
        spacing: {
            after: 200
        }
    }));
    // Tijdplanning
    children.push(sectionHeader('2. Lesoverzicht & tijdplanning'));
    const tpRows = lesson.lesplanformulier.tijdplanning;
    const tpTable = new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Table"]({
        width: {
            size: 100,
            type: __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["WidthType"].PERCENTAGE
        },
        borders: simpleBorders(),
        rows: [
            headerRow([
                'Tijd',
                'Fase',
                'Activiteit',
                'Lesdoel'
            ]),
            ...tpRows.map((r, i)=>dataRow([
                    r.tijd,
                    r.fase,
                    r.activiteit,
                    r.lesdoel
                ], i % 2 === 1))
        ]
    });
    children.push(tpTable, new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Paragraph"]({
        spacing: {
            after: 200
        }
    }));
    // Modelantwoorden
    children.push(sectionHeader('3. Modelantwoorden per opdracht'));
    antwoordblad.antwoordenPerOpdracht.forEach((a)=>{
        children.push(bodyParagraph(`Opdracht ${a.opdracht}`, {
            bold: true,
            color: DARK_BLUE
        }));
        a.modelantwoorden.forEach((ma)=>children.push(bulletParagraph(ma)));
        children.push(new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Paragraph"]({
            spacing: {
                after: 160
            }
        }));
    });
    // Differentiatie tips
    children.push(sectionHeader('4. Differentiatie & tips'));
    Object.entries(antwoordblad.differentiatieTips).forEach(([key, val])=>{
        children.push(bodyParagraph(`${key.toUpperCase()}: ${val}`));
    });
    // AI analyse (optional)
    if (antwoordblad.aiAnalyseObservaties?.length) {
        children.push(sectionHeader('5. AI-analyse modelobservaties'));
        antwoordblad.aiAnalyseObservaties.forEach((obs)=>children.push(bulletParagraph(obs)));
    }
    const doc = new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Document"]({
        sections: [
            {
                properties: {},
                children
            }
        ],
        styles: {
            default: {
                document: {
                    run: {
                        font: 'Calibri',
                        size: 22
                    }
                }
            }
        }
    });
    return Buffer.from(await __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Packer"].toBuffer(doc));
}
async function buildOefendocument(lesson, form) {
    const { oefendocument } = lesson;
    const children = [];
    children.push(new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Paragraph"]({
        children: [
            new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["TextRun"]({
                text: oefendocument.title,
                bold: true,
                size: 36,
                color: DARK_BLUE,
                font: 'Calibri'
            })
        ],
        alignment: __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["AlignmentType"].CENTER,
        spacing: {
            after: 100
        }
    }), bodyParagraph(oefendocument.intro, {
        color: '444444'
    }), new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Paragraph"]({
        spacing: {
            after: 200
        }
    }));
    oefendocument.oefeningen.forEach((o)=>{
        children.push(sectionHeader(`Oefening ${o.nummer}`), bodyParagraph(o.opdracht));
        const lines = o.ruimte === 'groot' ? 6 : o.ruimte === 'middel' ? 4 : 2;
        children.push(...writingLines(lines));
        children.push(new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Paragraph"]({
            spacing: {
                after: 160
            }
        }));
    });
    const doc = new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Document"]({
        sections: [
            {
                properties: {},
                children
            }
        ],
        styles: {
            default: {
                document: {
                    run: {
                        font: 'Calibri',
                        size: 22
                    }
                }
            }
        }
    });
    return Buffer.from(await __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Packer"].toBuffer(doc));
}
async function buildLesplanformulier(lesson, form) {
    const { lesplanformulier } = lesson;
    const children = [];
    children.push(new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Paragraph"]({
        children: [
            new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["TextRun"]({
                text: 'Lesplanformulier',
                bold: true,
                size: 36,
                color: DARK_BLUE,
                font: 'Calibri'
            })
        ],
        alignment: __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["AlignmentType"].CENTER,
        spacing: {
            after: 300
        }
    }));
    // Basisgegevens table
    children.push(sectionHeader('Basisgegevens'));
    const bg = lesplanformulier.basisgegevens;
    const bgTable = new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Table"]({
        width: {
            size: 100,
            type: __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["WidthType"].PERCENTAGE
        },
        borders: simpleBorders(),
        rows: [
            headerRow([
                'Veld',
                'Waarde'
            ]),
            dataRow([
                'Vak',
                bg.vak
            ], true),
            dataRow([
                'Klas / Niveau',
                bg.klas
            ]),
            dataRow([
                'Thema',
                bg.thema
            ], true),
            dataRow([
                'Lesduur',
                bg.lesduur
            ]),
            dataRow([
                'Werkvorm',
                form.werkvorm
            ], true)
        ]
    });
    children.push(bgTable, new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Paragraph"]({
        spacing: {
            after: 200
        }
    }));
    // Lesdoelen
    children.push(sectionHeader('Lesdoelen (SMART + Bloom)'));
    lesplanformulier.lesdoelen.forEach((d, i)=>children.push(bulletParagraph(`LD${i + 1}: ${d}`)));
    children.push(new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Paragraph"]({
        spacing: {
            after: 200
        }
    }));
    // Materialen
    children.push(sectionHeader('Benodigde materialen'));
    lesplanformulier.materialen.forEach((m)=>children.push(bulletParagraph(m)));
    children.push(new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Paragraph"]({
        spacing: {
            after: 200
        }
    }));
    // Tijdplanning
    children.push(sectionHeader('Tijdplanning per fase'));
    const tpTable = new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Table"]({
        width: {
            size: 100,
            type: __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["WidthType"].PERCENTAGE
        },
        borders: simpleBorders(),
        rows: [
            headerRow([
                'Tijd',
                'Fase',
                'Activiteit',
                'Lesdoel'
            ]),
            ...lesplanformulier.tijdplanning.map((r, i)=>dataRow([
                    r.tijd,
                    r.fase,
                    r.activiteit,
                    r.lesdoel
                ], i % 2 === 1))
        ]
    });
    children.push(tpTable, new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Paragraph"]({
        spacing: {
            after: 200
        }
    }));
    // Didactische aanpak
    children.push(sectionHeader('Didactische aanpak per fase'));
    lesplanformulier.didactischeAanpak.forEach((d)=>children.push(bulletParagraph(d)));
    children.push(new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Paragraph"]({
        spacing: {
            after: 200
        }
    }));
    // Differentiatie
    children.push(sectionHeader('Differentiatie'));
    children.push(bodyParagraph('Ondersteuning: ' + lesplanformulier.differentiatie.ondersteuning));
    children.push(bodyParagraph('Verrijking: ' + lesplanformulier.differentiatie.verrijking));
    children.push(new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Paragraph"]({
        spacing: {
            after: 200
        }
    }));
    // Evaluatie
    children.push(sectionHeader('Evaluatie lesdoelen'));
    lesplanformulier.evaluatie.forEach((e)=>children.push(bulletParagraph(e)));
    const doc = new __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Document"]({
        sections: [
            {
                properties: {},
                children
            }
        ],
        styles: {
            default: {
                document: {
                    run: {
                        font: 'Calibri',
                        size: 22
                    }
                }
            }
        }
    });
    return Buffer.from(await __TURBOPACK__imported__module__$5b$externals$5d2f$docx__$5b$external$5d$__$28$docx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$docx$29$__["Packer"].toBuffer(doc));
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/buildPptx.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildPptx",
    ()=>buildPptx
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$pptxgenjs__$5b$external$5d$__$28$pptxgenjs$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$pptxgenjs$29$__ = __turbopack_context__.i("[externals]/pptxgenjs [external] (pptxgenjs, cjs, [project]/node_modules/pptxgenjs)");
;
// ── Brand palette ────────────────────────────────────────────────────────────
const NAVY = '1B2A6B';
const NAVY_DEEP = '14205A';
const SOFT_BG = 'F0F4FA'; // page background
const SOFT_BORDER = 'CADCFC';
const TABLE_HEADER_BG = 'DDE7F5';
const RED = 'CC0000';
const WHITE = 'FFFFFF';
const GREY_TIMER = 'E5E9F0';
const GREY_TEXT = '4A5568';
// ── Layout (16:9, inches) ─────────────────────────────────────────────────────
const W = 13.333;
const H = 7.5;
const MARGIN = 0.6;
// ── Image fetching via Pollinations.ai (free, no auth) ────────────────────────
async function fetchImage(query, seed) {
    try {
        const prompt = `professional editorial stock photo, ${query}, natural lighting, high quality, photorealistic, no text`;
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=768&nologo=true&seed=${seed}&model=flux`;
        const controller = new AbortController();
        const timeoutId = setTimeout(()=>controller.abort(), 25000);
        const res = await fetch(url, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (!res.ok) return null;
        const buf = Buffer.from(await res.arrayBuffer());
        if (buf.length < 1000) return null;
        return `data:image/jpeg;base64,${buf.toString('base64')}`;
    } catch  {
        return null;
    }
}
/** Fetch all images in parallel; returns Map<slideNumber, dataUrl|null>. */ async function preloadImages(slides) {
    const out = new Map();
    const tasks = slides.filter((s)=>s.imageQuery && s.imageQuery.trim().length > 0).slice(0, 10) // cap total images for performance
    .map(async (s, idx)=>{
        const dataUrl = await fetchImage(s.imageQuery, 1000 + idx);
        if (dataUrl) out.set(s.slideNumber, dataUrl);
    });
    await Promise.allSettled(tasks);
    return out;
}
// ── Helpers ───────────────────────────────────────────────────────────────────
function setBackground(p) {
    p.background = {
        color: SOFT_BG
    };
}
function addTitle(p, text, opts = {}) {
    p.addText(text, {
        x: opts.x ?? MARGIN,
        y: opts.y ?? 0.5,
        w: opts.w ?? W - 2 * MARGIN,
        h: opts.h ?? 1.0,
        fontSize: opts.size ?? 36,
        bold: true,
        color: NAVY,
        fontFace: 'Calibri',
        align: 'left',
        valign: 'top',
        wrap: true
    });
}
function addBodyBullets(p, items, opts = {}) {
    if (!items.length) return;
    const blocks = items.map((text)=>({
            text,
            options: {
                bullet: {
                    type: 'bullet'
                },
                fontSize: opts.size ?? 18,
                color: opts.color ?? NAVY,
                fontFace: 'Calibri',
                paraSpaceAfter: 8
            }
        }));
    p.addText(blocks, {
        x: opts.x ?? MARGIN,
        y: opts.y ?? 1.8,
        w: opts.w ?? W - 2 * MARGIN,
        h: opts.h ?? 5.0,
        valign: 'top',
        wrap: true
    });
}
function addPlainBody(p, lines, opts = {}) {
    if (!lines.length) return;
    const blocks = lines.map((text)=>({
            text,
            options: {
                fontSize: opts.size ?? 18,
                color: opts.color ?? NAVY,
                fontFace: 'Calibri',
                paraSpaceAfter: 6
            }
        }));
    p.addText(blocks, {
        x: opts.x ?? MARGIN,
        y: opts.y ?? 1.8,
        w: opts.w ?? W - 2 * MARGIN,
        h: opts.h ?? 5.0,
        valign: 'top',
        wrap: true
    });
}
function addImage(p, dataUrl, x, y, w, h) {
    if (dataUrl) {
        p.addImage({
            data: dataUrl,
            x,
            y,
            w,
            h,
            sizing: {
                type: 'cover',
                w,
                h
            }
        });
    } else {
        // Stylish placeholder card
        p.addShape('roundRect', {
            x,
            y,
            w,
            h,
            fill: {
                color: SOFT_BORDER
            },
            line: {
                color: SOFT_BORDER
            },
            rectRadius: 0.15
        });
        p.addText('🖼️', {
            x,
            y,
            w,
            h,
            fontSize: 48,
            align: 'center',
            valign: 'middle',
            color: NAVY,
            fontFace: 'Calibri'
        });
    }
}
function addTimerWidget(p, time, x, y) {
    // time format "5:00" or "2:30"
    const [m, s] = time.split(':');
    const w = 3.0;
    const h = 1.5;
    const boxW = (w - 0.2) / 2;
    // Background card
    p.addShape('roundRect', {
        x,
        y,
        w,
        h,
        fill: {
            color: GREY_TIMER
        },
        line: {
            color: GREY_TIMER
        },
        rectRadius: 0.12
    });
    // Minutes box
    p.addShape('roundRect', {
        x: x + 0.1,
        y: y + 0.1,
        w: boxW - 0.05,
        h: h - 0.6,
        fill: {
            color: WHITE
        },
        line: {
            color: WHITE
        },
        rectRadius: 0.08
    });
    p.addText(m ?? '0', {
        x: x + 0.1,
        y: y + 0.1,
        w: boxW - 0.05,
        h: h - 0.85,
        fontSize: 36,
        bold: true,
        color: NAVY,
        fontFace: 'Calibri',
        align: 'center',
        valign: 'middle'
    });
    p.addText('m', {
        x: x + 0.1,
        y: y + h - 0.85,
        w: boxW - 0.05,
        h: 0.25,
        fontSize: 11,
        color: GREY_TEXT,
        fontFace: 'Calibri',
        align: 'center',
        valign: 'top'
    });
    // Seconds box
    p.addShape('roundRect', {
        x: x + boxW + 0.15,
        y: y + 0.1,
        w: boxW - 0.05,
        h: h - 0.6,
        fill: {
            color: WHITE
        },
        line: {
            color: WHITE
        },
        rectRadius: 0.08
    });
    p.addText(s ?? '00', {
        x: x + boxW + 0.15,
        y: y + 0.1,
        w: boxW - 0.05,
        h: h - 0.85,
        fontSize: 36,
        bold: true,
        color: NAVY,
        fontFace: 'Calibri',
        align: 'center',
        valign: 'middle'
    });
    p.addText('s', {
        x: x + boxW + 0.15,
        y: y + h - 0.85,
        w: boxW - 0.05,
        h: 0.25,
        fontSize: 11,
        color: GREY_TEXT,
        fontFace: 'Calibri',
        align: 'center',
        valign: 'top'
    });
    // Progress bar
    p.addShape('roundRect', {
        x: x + 0.15,
        y: y + h - 0.4,
        w: w - 0.3,
        h: 0.18,
        fill: {
            color: WHITE
        },
        line: {
            color: WHITE
        },
        rectRadius: 0.05
    });
    p.addShape('roundRect', {
        x: x + 0.15,
        y: y + h - 0.4,
        w: (w - 0.3) * 0.45,
        h: 0.18,
        fill: {
            color: SOFT_BORDER
        },
        line: {
            color: SOFT_BORDER
        },
        rectRadius: 0.05
    });
}
function addHandoutRef(p, ref) {
    p.addText(`📄 Noteer dit bij ${ref} in je boekje.`, {
        x: MARGIN,
        y: H - 0.6,
        w: W - 2 * MARGIN,
        h: 0.35,
        fontSize: 13,
        italic: true,
        color: GREY_TEXT,
        fontFace: 'Calibri'
    });
}
function addSlideNumber(p, num, total) {
    p.addText(`${num} / ${total}`, {
        x: W - 1.2,
        y: H - 0.4,
        w: 1.0,
        h: 0.3,
        fontSize: 10,
        color: '999999',
        fontFace: 'Calibri',
        align: 'right'
    });
}
function addEmphasizedBullets(p, items, y) {
    if (!items.length) return;
    const blocks = items.map((text)=>({
            text,
            options: {
                fontSize: 22,
                bold: true,
                color: RED,
                fontFace: 'Calibri',
                paraSpaceAfter: 10,
                align: 'center'
            }
        }));
    p.addText(blocks, {
        x: MARGIN,
        y,
        w: W - 2 * MARGIN,
        h: H - y - 0.5,
        valign: 'top',
        wrap: true,
        align: 'center'
    });
}
// ── Slide builders ────────────────────────────────────────────────────────────
function buildTitleSlide(p, slide, total, image) {
    setBackground(p);
    // Big image card on top
    addImage(p, image, MARGIN, 0.5, W - 2 * MARGIN, 4.6);
    // Title below
    p.addText(slide.title, {
        x: MARGIN,
        y: 5.4,
        w: W - 2 * MARGIN,
        h: 1.4,
        fontSize: 40,
        bold: true,
        color: NAVY,
        fontFace: 'Calibri',
        align: 'left',
        valign: 'top',
        wrap: true
    });
    if (slide.subtitle) {
        p.addText(slide.subtitle, {
            x: MARGIN,
            y: 6.7,
            w: W - 2 * MARGIN,
            h: 0.5,
            fontSize: 16,
            color: GREY_TEXT,
            fontFace: 'Calibri',
            italic: true
        });
    }
    addSlideNumber(p, slide.slideNumber, total);
}
function buildTransparencySlide(p, slide, total) {
    setBackground(p);
    // Red side bar
    p.addShape('rect', {
        x: MARGIN,
        y: 0.5,
        w: 0.12,
        h: H - 1.0,
        fill: {
            color: RED
        },
        line: {
            color: RED
        }
    });
    addTitle(p, slide.title, {
        x: MARGIN + 0.4,
        y: 0.5,
        h: 1.1,
        size: 38
    });
    addBodyBullets(p, slide.bullets ?? [], {
        x: MARGIN + 0.4,
        y: 1.9,
        w: W - MARGIN - 0.4 - MARGIN,
        h: 4.5,
        size: 22
    });
    addSlideNumber(p, slide.slideNumber, total);
}
function buildGoalsSlide(p, slide, total) {
    setBackground(p);
    addTitle(p, slide.title || 'Lesdoelen', {
        size: 40
    });
    if (slide.subtitle) {
        p.addText(slide.subtitle, {
            x: MARGIN,
            y: 1.7,
            w: W - 2 * MARGIN,
            h: 0.5,
            fontSize: 20,
            color: NAVY,
            fontFace: 'Calibri'
        });
    }
    // Numbered list (no bullets, big numbers)
    const items = slide.bullets ?? [];
    const startY = slide.subtitle ? 2.5 : 2.0;
    const lineH = 0.7;
    items.forEach((item, i)=>{
        p.addText(item, {
            x: MARGIN + 0.2,
            y: startY + i * lineH,
            w: W - 2 * MARGIN - 0.2,
            h: lineH,
            fontSize: 22,
            color: NAVY,
            fontFace: 'Calibri',
            valign: 'top'
        });
    });
    addSlideNumber(p, slide.slideNumber, total);
}
function buildProgrammaSlide(p, slide, total, image) {
    setBackground(p);
    // Image on left (full height, half width)
    const halfW = (W - 3 * MARGIN) / 2;
    addImage(p, image, MARGIN, MARGIN, halfW, H - 2 * MARGIN);
    // Title and content on right
    const rightX = MARGIN + halfW + MARGIN;
    addTitle(p, slide.title || 'Programma', {
        x: rightX,
        y: 1.0,
        w: halfW,
        h: 1.0,
        size: 36
    });
    addBodyBullets(p, slide.bullets ?? [], {
        x: rightX,
        y: 2.2,
        w: halfW,
        h: H - 3.0,
        size: 20
    });
    addSlideNumber(p, slide.slideNumber, total);
}
function buildBigTitleSlide(p, slide, total) {
    setBackground(p);
    p.addText(slide.title, {
        x: MARGIN,
        y: H / 2 - 1.2,
        w: W - 2 * MARGIN,
        h: 1.4,
        fontSize: 60,
        bold: true,
        color: NAVY,
        fontFace: 'Calibri',
        align: 'center',
        valign: 'middle'
    });
    if (slide.subtitle) {
        p.addText(slide.subtitle, {
            x: MARGIN,
            y: H / 2 + 0.4,
            w: W - 2 * MARGIN,
            h: 0.8,
            fontSize: 22,
            color: NAVY,
            fontFace: 'Calibri',
            align: 'center',
            bold: true
        });
    }
    addSlideNumber(p, slide.slideNumber, total);
}
function buildDiscussionSlide(p, slide, total) {
    setBackground(p);
    addTitle(p, slide.title, {
        size: 38
    });
    // Body — left half if timer is present, full width otherwise
    const hasTimer = slide.timer && slide.timer.trim().length > 0;
    const bodyW = hasTimer ? W - 5.0 : W - 2 * MARGIN;
    addBodyBullets(p, slide.bullets ?? [], {
        x: MARGIN,
        y: 2.0,
        w: bodyW,
        h: 4.5,
        size: 22
    });
    if (hasTimer) {
        addTimerWidget(p, slide.timer, W - 4.0, 1.6);
    }
    if (slide.handoutRef) addHandoutRef(p, slide.handoutRef);
    addSlideNumber(p, slide.slideNumber, total);
}
function buildContentSlide(p, slide, total, image) {
    setBackground(p);
    const hasImage = !!slide.imageQuery;
    if (hasImage) {
        // Two-column: text left (55%), image right (40%)
        const leftW = (W - 3 * MARGIN) * 0.55;
        const rightX = MARGIN + leftW + MARGIN;
        const rightW = W - rightX - MARGIN;
        addTitle(p, slide.title, {
            x: MARGIN,
            y: 1.0,
            w: leftW,
            h: 1.0,
            size: 34
        });
        addBodyBullets(p, slide.bullets ?? [], {
            x: MARGIN,
            y: 2.2,
            w: leftW,
            h: H - 3.0,
            size: 19
        });
        addImage(p, image, rightX, 1.0, rightW, H - 2.0);
    } else {
        addTitle(p, slide.title, {
            size: 38
        });
        addBodyBullets(p, slide.bullets ?? [], {
            y: 2.0,
            size: 22
        });
    }
    if (slide.handoutRef) addHandoutRef(p, slide.handoutRef);
    addSlideNumber(p, slide.slideNumber, total);
}
function buildAssignmentSlide(p, slide, total, image) {
    setBackground(p);
    // Title left, timer top right
    addTitle(p, slide.title, {
        x: MARGIN,
        y: 0.5,
        w: W - 4.5,
        h: 1.1,
        size: 36
    });
    if (slide.timer) addTimerWidget(p, slide.timer, W - 3.6, 0.6);
    const hasImage = !!slide.imageQuery;
    if (hasImage) {
        const leftW = (W - 3 * MARGIN) * 0.55;
        const rightX = MARGIN + leftW + MARGIN;
        const rightW = W - rightX - MARGIN;
        addBodyBullets(p, slide.bullets ?? [], {
            x: MARGIN,
            y: 2.4,
            w: leftW,
            h: H - 3.5,
            size: 19
        });
        addImage(p, image, rightX, 2.4, rightW, H - 3.5);
    } else {
        addBodyBullets(p, slide.bullets ?? [], {
            y: 2.4,
            size: 22
        });
    }
    if (slide.handoutRef) addHandoutRef(p, slide.handoutRef);
    addSlideNumber(p, slide.slideNumber, total);
}
function buildTableSlide(p, slide, total) {
    setBackground(p);
    addTitle(p, slide.title, {
        size: 36
    });
    if (slide.table && slide.table.rows.length > 0) {
        const t = slide.table;
        const rows = [
            t.headers.map((h)=>({
                    text: h,
                    options: {
                        bold: true,
                        color: NAVY,
                        fontFace: 'Calibri',
                        fontSize: 16,
                        fill: {
                            color: TABLE_HEADER_BG
                        },
                        align: 'left',
                        valign: 'middle'
                    }
                })),
            ...t.rows.map((row, ri)=>row.map((cell)=>({
                        text: cell,
                        options: {
                            fontFace: 'Calibri',
                            fontSize: 14,
                            color: NAVY,
                            fill: {
                                color: ri % 2 === 0 ? WHITE : SOFT_BG
                            },
                            align: 'left',
                            valign: 'top'
                        }
                    })))
        ];
        p.addTable(rows, {
            x: MARGIN,
            y: 1.7,
            w: W - 2 * MARGIN,
            border: {
                type: 'solid',
                pt: 0.5,
                color: SOFT_BORDER
            },
            rowH: 0.6
        });
    } else if (slide.bullets && slide.bullets.length) {
        // bullet list (used for Nakijken slides)
        addPlainBody(p, slide.bullets, {
            y: 1.8,
            size: 20
        });
    }
    // Emphasized bullets (red, e.g. "Nog meer?")
    if (slide.emphasizedBullets && slide.emphasizedBullets.length) {
        addEmphasizedBullets(p, slide.emphasizedBullets, H - 2.0);
    }
    addSlideNumber(p, slide.slideNumber, total);
}
function buildClosingSlide(p, slide, total, image) {
    setBackground(p);
    // Big centered title with image below or behind
    if (slide.imageQuery) {
        addImage(p, image, MARGIN, 0.5, W - 2 * MARGIN, 4.0);
        p.addText(slide.title, {
            x: MARGIN,
            y: 5.0,
            w: W - 2 * MARGIN,
            h: 1.5,
            fontSize: 44,
            bold: true,
            color: NAVY,
            fontFace: 'Calibri',
            align: 'center',
            valign: 'middle'
        });
    } else {
        p.addText(slide.title, {
            x: MARGIN,
            y: H / 2 - 1.0,
            w: W - 2 * MARGIN,
            h: 2.0,
            fontSize: 54,
            bold: true,
            color: NAVY,
            fontFace: 'Calibri',
            align: 'center',
            valign: 'middle'
        });
    }
    if (slide.bullets && slide.bullets.length) {
        addPlainBody(p, slide.bullets, {
            y: H - 2.0,
            size: 18
        });
    }
    addSlideNumber(p, slide.slideNumber, total);
}
function buildExitTicketSlide(p, slide, total) {
    setBackground(p);
    // Red-ish accent header
    p.addShape('rect', {
        x: 0,
        y: 0,
        w: W,
        h: 0.18,
        fill: {
            color: RED
        },
        line: {
            color: RED
        }
    });
    addTitle(p, slide.title || 'Exit-ticket', {
        y: 0.6,
        size: 40
    });
    addBodyBullets(p, slide.bullets ?? [], {
        y: 2.0,
        size: 22
    });
    addSlideNumber(p, slide.slideNumber, total);
}
async function buildPptx(lesson) {
    const pptx = new __TURBOPACK__imported__module__$5b$externals$5d2f$pptxgenjs__$5b$external$5d$__$28$pptxgenjs$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$pptxgenjs$29$__["default"]();
    pptx.layout = 'LAYOUT_WIDE';
    pptx.author = 'Lessengenerator';
    const slides = lesson.powerpoint.slides;
    const total = slides.length;
    // Pre-fetch images in parallel
    const images = await preloadImages(slides);
    for (const slide of slides){
        const p = pptx.addSlide();
        const img = images.get(slide.slideNumber);
        switch(slide.type){
            case 'title':
                buildTitleSlide(p, slide, total, img);
                break;
            case 'transparency':
                buildTransparencySlide(p, slide, total);
                break;
            case 'goals':
                buildGoalsSlide(p, slide, total);
                break;
            case 'programma':
                buildProgrammaSlide(p, slide, total, img);
                break;
            case 'big-title':
                buildBigTitleSlide(p, slide, total);
                break;
            case 'discussion':
                buildDiscussionSlide(p, slide, total);
                break;
            case 'content':
                buildContentSlide(p, slide, total, img);
                break;
            case 'assignment':
                buildAssignmentSlide(p, slide, total, img);
                break;
            case 'table':
                buildTableSlide(p, slide, total);
                break;
            case 'closing':
                buildClosingSlide(p, slide, total, img);
                break;
            case 'exit-ticket':
                buildExitTicketSlide(p, slide, total);
                break;
            default:
                buildContentSlide(p, slide, total, img);
                break;
        }
    }
    const buffer = await pptx.write({
        outputType: 'nodebuffer'
    });
    return buffer;
}
}),
"[project]/lib/buildZip.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "buildZip",
    ()=>buildZip
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$jszip__$5b$external$5d$__$28$jszip$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jszip$29$__ = __turbopack_context__.i("[externals]/jszip [external] (jszip, cjs, [project]/node_modules/jszip)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$buildDocx$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/buildDocx.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$buildPptx$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/buildPptx.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$buildDocx$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$buildDocx$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
function safeFilename(input) {
    return input.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '').slice(0, 40);
}
/** Ensure all arrays Claude might have omitted are at least empty arrays. */ function normalizeLesson(raw) {
    return {
        powerpoint: {
            slides: (raw.powerpoint?.slides ?? []).map((s)=>({
                    ...s,
                    bullets: s.bullets ?? [],
                    emphasizedBullets: s.emphasizedBullets ?? []
                }))
        },
        handout: {
            title: raw.handout?.title ?? '',
            subtitle: raw.handout?.subtitle ?? '',
            lesdoelen: raw.handout?.lesdoelen ?? [],
            sections: (raw.handout?.sections ?? []).map((s)=>({
                    ...s,
                    questions: s.questions ?? [],
                    support: s.support ?? [],
                    bonusopdracht: s.bonusopdracht ?? ''
                })),
            exitTicket: raw.handout?.exitTicket ?? []
        },
        antwoordblad: {
            title: raw.antwoordblad?.title ?? '',
            lesdoelenOverzicht: raw.antwoordblad?.lesdoelenOverzicht ?? [],
            antwoordenPerOpdracht: (raw.antwoordblad?.antwoordenPerOpdracht ?? []).map((a)=>({
                    ...a,
                    modelantwoorden: a.modelantwoorden ?? []
                })),
            differentiatieTips: raw.antwoordblad?.differentiatieTips ?? {},
            aiAnalyseObservaties: raw.antwoordblad?.aiAnalyseObservaties ?? []
        },
        oefendocument: {
            title: raw.oefendocument?.title ?? '',
            intro: raw.oefendocument?.intro ?? '',
            oefeningen: raw.oefendocument?.oefeningen ?? []
        },
        lesplanformulier: {
            basisgegevens: raw.lesplanformulier?.basisgegevens ?? {
                vak: '',
                klas: '',
                thema: '',
                lesduur: ''
            },
            lesdoelen: raw.lesplanformulier?.lesdoelen ?? [],
            materialen: raw.lesplanformulier?.materialen ?? [],
            tijdplanning: raw.lesplanformulier?.tijdplanning ?? [],
            didactischeAanpak: raw.lesplanformulier?.didactischeAanpak ?? [],
            differentiatie: raw.lesplanformulier?.differentiatie ?? {
                ondersteuning: '',
                verrijking: ''
            },
            evaluatie: raw.lesplanformulier?.evaluatie ?? []
        }
    };
}
async function buildZip(rawLesson, form) {
    const lesson = normalizeLesson(rawLesson);
    const slug = safeFilename(`${form.thema}_${form.klas}`);
    const prefix = `les_${slug}`;
    const fileNames = {
        pptx: `${prefix}_presentatie.pptx`,
        handout: `${prefix}_handout_leerlingen.docx`,
        antwoord: `${prefix}_antwoordblad_docent.docx`,
        oefening: `${prefix}_oefendocument.docx`,
        lesplan: `${prefix}_lesplanformulier.docx`
    };
    // Build all documents in parallel
    const [pptxBuf, handoutBuf, antwoordBuf, oefenBuf, lesplanBuf] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$buildPptx$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildPptx"])(lesson),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$buildDocx$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildHandout"])(lesson, form),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$buildDocx$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildAntwoordblad"])(lesson, form),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$buildDocx$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildOefendocument"])(lesson, form),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$buildDocx$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildLesplanformulier"])(lesson, form)
    ]);
    const zip = new __TURBOPACK__imported__module__$5b$externals$5d2f$jszip__$5b$external$5d$__$28$jszip$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jszip$29$__["default"]();
    zip.file(fileNames.pptx, pptxBuf);
    zip.file(fileNames.handout, handoutBuf);
    zip.file(fileNames.antwoord, antwoordBuf);
    zip.file(fileNames.oefening, oefenBuf);
    zip.file(fileNames.lesplan, lesplanBuf);
    const zipBuffer = await zip.generateAsync({
        type: 'nodebuffer',
        compression: 'DEFLATE',
        compressionOptions: {
            level: 6
        }
    });
    return {
        buffer: zipBuffer,
        filename: `${prefix}.zip`,
        files: Object.values(fileNames)
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/app/api/build-documents/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "maxDuration",
    ()=>maxDuration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$buildZip$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/buildZip.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$buildZip$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$buildZip$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const maxDuration = 120;
async function POST(req) {
    try {
        const body = await req.json();
        if (!body.lessonData || !body.formData) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Lesgegevens ontbreken.'
            }, {
                status: 400
            });
        }
        const { buffer, filename, files } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$buildZip$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildZip"])(body.lessonData, body.formData);
        const zipBase64 = buffer.toString('base64');
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            zipBase64,
            filename,
            files
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Onbekende fout';
        console.error('[build-documents]', message);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: message
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0mfvvup._.js.map