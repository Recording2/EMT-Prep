const scenarioBank = [
    {
        title: "Trauma: Construction Site Accident",
        category: "Trauma",
        dispatch: "22-year-old male down with unknown injury; construction site accident.",
        steps: [
            /* --- PHASE 1: SCENE SIZE-UP --- */
            { 
                name: "Scene Safety", 
                instr: "Construction workers are shouting for you to hurry. The forklift involved is still idling near the patient.", 
                choices: [
                    { t: "Have the foreman shut down the equipment and clear the workers.", c: true, f: "✅ Ensure Scene Safety" },
                    { t: "Ask the nearest worker to keep an eye on the machinery while you proceed.", criticalFail: true, f: "🚨 The forklift shifted! You are now a second patient. Scene Safety is ALWAYS first." }
                ] 
            },
            { 
                name: "PPE / BSI", 
                instr: "You see significant blood on the patient's shirt.", 
                choices: [
                    { t: "Put Gloves and Eye Pro on.", c: true, f: "✅ BSI / PPE" },
                    { t: "Call out to the patient to crawl toward you.", c: false, f: "Scene has been secured and patient should not move, especially after a traumatic event" },
                    { t: "Immediately Apply Direct Pressure", criticalFail: true, f: "🚨 Exposure! You touched blood without BSI." }
                ] 
            },
            { 
                name: "MOI / NOI", 
                instr: "Foreman says a piece of rebar snapped and hit the patient.", 
                choices: [
                    { t: "Confirm MOI", c: true, f: "✅ Penetrating trauma confirmed." }
                ] 
            },
            { 
                name: "Next Step", 
                instr: "Now that you have determine the MOI, what should you ask next?", 
                choices: [
                    { t: "How long ago was he injured?", c: false, f: "Before obtaining specific information, make sure he is the only patient that requires attention." },
                    { t: "Is he breathing and consious?", c: false, f: "Before obtaining specific information, make sure he is the only patient that requires attention."},
                    { t: "Where is the nearest Wendy's?", criticalFail: true, f: "This information is unecessary and actively wastes time."},
                    { t: "How many people were injured by the accident?", c: true, f: "✅ Foreman confirms only one person was hit.", finding: "#of pts: One Patient" }
                ] 
            },
            { 
                name: "Additional Resources", 
                instr: "Based on the information you've found, what do you need?", 
                choices: [
                    { t: "Request ALS", c: true, f: "✅ ALS requested for chest trauma." },
                    { t: "Request Coroner", c: false, f: "⚠️ Way too early! The patient is still conscious." }
                ] 
            },
            { 
                name: "General Impression /Life Threats/ C-Spine", 
                instr: "Patient is clutching his chest, tripodding, and appears pale. There is a red stain on his shirt.", 
                choices: [
                    { t: "Check his airway using a Jaw Thrust Manuever", c: false, f: "This patient has an immediate Life Threat!" },
                    { t: "Defer C-Spine and quickly move to the next step", c: false, f: "This patient has an immediate Life Threat!" },
                    { t: "Expose and investigate for Life Threats", c: true, f: "✅ His symptoms and appearance indicate a need for immediate intervention" },
                    { t: "Apply C-Collar", c: false, f: "⚠️ Distraction! C-spine isn't indicated and will delay your assessment." }
                ] 
            },
            { 
                name: "AVPU", 
                instr: "The patient makes eye contact and groans as you approach.", 
                choices: [
                    { t: "Check AVPU", c: true, f: "✅ Patient is Alert." },
                    { t: "Check Pain Response", c: false, f: "⚠️ He is already looking at you; he is 'Alert', no need for 'Pain' or 'Verbal' testing." }
                ] 
            },
            /* --- AIRWAY SECTION --- */
            { 
                name: "Primary: Airway", 
                instr: "Investigate the airway thoroughly.", 
                requiredChecks: ["Clear", "Color", "Patency", "Moisture"],
                choices: [
                    { t: "Clear", c: true, f: "✅ No obstructions or fluids noted." },
                    { t: "Color", c: true, f: "✅ Mucosa is slightly pale.", finding: "Airway: Pale Mucosa" },
                    { t: "Patency", c: true, f: "✅ Airway is patent; patient is speaking." },
                    { t: "Moisture", c: true, f: "✅ Membranes are moist." },
                    { t: "Insert OPA", criticalFail: true, f: "🚨 Patient is alert! OPA caused vomiting." }
                ] 
            },
            /* --- BREATHING SECTION --- */
            { 
                name: "Primary: Breathing", 
                instr: "Assess respiratory status and life-threats.", 
                requiredChecks: ["RRQ", "Auscultate", "Oxygenate", "Intervention"],
                choices: [
                    { t: "RRQ", c: true, f: "✅ Rate: 28, Rhythm: Irregular, Quality: Labored.", vitals: { rr: "28" } },
                    { t: "Auscultate", c: true, f: "✅ Diminished breath sounds on the right.", finding: "Lungs: Diminished Right" },
                    { t: "Oxygenate", c: true, f: "✅ NRB at 15L/min applied.", vitals: { spo2: "92%" } },
                    { t: "Intervention", c: true, f: "✅ Sucking chest wound sealed with occlusive dressing.", finding: "Treatment: Occlusive Dressing" },
                    { t: "Perform CPR", criticalFail: true, f: "🚨 Patient has a pulse and is breathing!" }
                ] 
            },
            /* --- CIRCULATION SECTION --- */
            { 
                name: "Primary: Circulation", 
                instr: "Assess perfusion and control bleeding.", 
                requiredChecks: ["RRQ", "Skin Texture", "Skin Temp", "Skin Color", "Cap Refill", "Blood Sweep"],
                choices: [
                    { t: "RRQ", c: true, f: "✅ Pulse: 120, Rhythm: Regular, Quality: Weak.", vitals: { hr: "120" } },
                    { t: "Skin Texture", c: true, f: "✅ Skin is diaphoretic (sweaty)." },
                    { t: "Skin Temp", c: true, f: "✅ Skin is cool to the touch." },
                    { t: "Skin Color", c: true, f: "✅ Skin is pale/cyanotic.", finding: "Skin: Pale/Cool/Clammy" },
                    { t: "Cap Refill", c: true, f: "✅ Delayed (> 2 seconds).", finding: "Circulation: Delayed Cap Refill" },
                    { t: "Blood Sweep", c: true, f: "✅ No other major external bleeding found." }
                ] 
            },
            /* --- DISABILITY & EXPOSE --- */
            { 
                name: "Primary: Disability", 
                instr: "Check neurological status.", 
                choices: [{ t: "Check Disability", c: true, f: "✅ Pupils PEARL; moves all extremities.", finding: "Pupils: PEARL" }] 
            },
            { 
                name: "Primary: Expose/Decision", 
                instr: "Finalize priority and exposure.", 
                choices: [
                    { t: "Expose / High Priority", c: true, f: "✅ Patient is high priority. Load and Go!" },
                    { t: "Low Priority", criticalFail: true, f: "🚨 Penetrating trauma is ALWAYS high priority." }
                ] 
            },
            /* --- PHASE 3: SECONDARY ASSESSMENT --- */
            {
                name: "Secondary Assessment Hub",
                instr: "You are en route. Perform your full investigation in any order.",
                requiredChecks: ["Vitals", "Focused Exam", "Head to Toe", "SAMPLE", "OPQRST"], 
                choices: [
                    { t: "Vitals", c: true, f: "✅ BP: 90/60, HR: 124, RR: 28, SpO2: 94%.", vitals: { bp: "90/60", hr: "124", rr: "28", spo2: "94%" } },
                    { t: "Focused Exam", c: true, f: "✅ No JVD; trachea is midline.", finding: "Exam: No Tracheal Deviation" },
                    { t: "Head to Toe", c: true, f: "✅ No other major trauma discovered." },
                    { t: "SAMPLE", c: true, f: "✅ No known allergies; no medications." },
                    { t: "OPQRST", c: true, f: "✅ Pain is sharp and worsens with breathing." }
                ]
            },
            /* --- PHASE 4: REASSESSMENT --- */
            {
                name: "Reassessment",
                instr: "How often will you check this patient?",
                choices: [
                    { t: "Every 5 Minutes", c: true, f: "✅ Correct for unstable patients." },
                    { t: "Every 15 Minutes", c: false, f: "❌ Too long for a critical trauma." }
                ]
            }
        ]
    }
];