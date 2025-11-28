// ===== Uses window.DATA_TEMPLATE from data_template.js =====
// DATA_TEMPLATE: [ { chapterId, chapterCode, chapterTitle,
//                   questions:[{id,code,text,guidance}, ...] }, ... ]

(function () {
    const COMMENTS_KEY = "preinsp_comments_v2";
    const IMAGES_KEY = "preinsp_images_v1";
    const OBS_KEY = "preinsp_observations_v1";

    // ----------------- CORE DATA -----------------
    const chaptersRaw = Array.isArray(window.DATA_TEMPLATE) ? window.DATA_TEMPLATE : [];

    // Additional Items data (exact text as given)
    const ADDITIONAL_ITEMS = [
        {
            groupId: "A",
            groupTitle: "A. Physical Inspection Detainable Items",
            items: [
                { id: "A1", title: "1. Fire dampers in close position (4 photos)", maxPhotos: 4 },
                { id: "A2", title: "2. Funnel flaps from inside in close position (4 photos)", maxPhotos: 4 },
                { id: "A3", title: "3. Emergency generator operating by manual mode (4 photos)", maxPhotos: 4 },
                { id: "A4", title: "4. Emergency fire pump's pressure (4 photos)", maxPhotos: 4 },
                { id: "A5", title: "5. EGC test call and answer back acknowledgement (4 photos)", maxPhotos: 4 },
                { id: "A6", title: "6. Water ingress panel (4 photos)", maxPhotos: 4 },
                { id: "A7", title: "7. Operational status of both ECDIS units. (4 photos)", maxPhotos: 4 },
                { id: "A8", title: "8. ENC Chart Status report based on current route and the intended voyage as same is generated from ECDIS system. (4 photos)", maxPhotos: 4 },
                { id: "A9", title: "9. ADPs and e-NPs certificates (Update Status Report) as generated from both computers respectively. Four (4) certificates in total to be sent with all relevant publications listed. (4 photos)", maxPhotos: 4 },
                { id: "A10", title: "10. Screenshot of e-NP reader/Tools from both PCs (Make sure all items are “blue” & Updated). (4 photos)", maxPhotos: 4 },
                { id: "A11", title: "11. Operational status of communication equipment. (4 photos)", maxPhotos: 4 },
                { id: "A12", title: "12. Operational status of navigation equipment. (4 photos)", maxPhotos: 4 },
                { id: "A13", title: "13. Fire line isolation valve in close position (4 photos)", maxPhotos: 4 },
                { id: "A14", title: "14. Fire man's suits and BA pressure (4 photos)", maxPhotos: 4 },
                { id: "A15", title: "15. EEBD one or two (4 photos)", maxPhotos: 4 },
                { id: "A16", title: "16. L/Bs running the engine (4 photos)", maxPhotos: 4 },
                { id: "A17", title: "17. L/Bs release mechanisms (4 photos)", maxPhotos: 4 },
                { id: "A18", title: "18. General Photos of the Engine room (12 photos)", maxPhotos: 12 },
                { id: "A19", title: "19. OWS testing (4 photos)", maxPhotos: 4 },
                { id: "A20", title: "20. Testing of 220V/440V Earth Leakage (4 photos)", maxPhotos: 4 }
            ]
        },
        {
            groupId: "B",
            groupTitle: "B. Bridge Items",
            items: [
                { id: "B1", title: "1. VHF - Dsc Call from Primary VHF to secondary VHF (4 photos)", maxPhotos: 4 },
                { id: "B2", title: "2. MF - Dsc call with coast station (4 photos)", maxPhotos: 4 },
                { id: "B3", title: "3. MF/HF - Contact with coast station / recognition from the coast station / make test by pressing relevant order and recognition from the coast from the coast station of the test (4 photos)", maxPhotos: 4 },
                { id: "B4", title: "4. Inmarsat C - PV test (4 photos)", maxPhotos: 4 },
                { id: "B5", title: "5. GMDSS portable VHF - Relevant test of proper operation (4 photos)", maxPhotos: 4 },
                { id: "B6", title: "6. Power supply charger - Black out test and operation of GMDSS for 1 hour (4 photos)", maxPhotos: 4 }
            ]
        },
        {
            groupId: "AIS",
            groupTitle: "AIS",
            items: [
                { id: "AIS1", title: "1. Power supply black out test in order to operate only by batteries (4 photos)", maxPhotos: 4 },
                { id: "AIS2", title: "2. No alarm in the display (4 photos)", maxPhotos: 4 },
                { id: "AIS3", title: "3. Operation with external GNSS (GPS) (4 photos)", maxPhotos: 4 }
            ]
        },
        {
            groupId: "ECDIS",
            groupTitle: "ECDIS",
            items: [
                { id: "E1", title: "1. UPS black out test where ecdis must operate for 2 hours (4 photos)", maxPhotos: 4 },
                { id: "E2", title: "2. Switch off primary GPS in order to operate with the secondary and the opposite (4 photos)", maxPhotos: 4 },
                {
                    id: "E3",
                    title: "3. Proper indication of GPS , GYRO , SPEEDLOG , AIS (2 photos for each)",
                    sections: [
                        { id: "GPS", label: "GPS", maxPhotos: 2 },
                        { id: "GYRO", label: "GYRO", maxPhotos: 2 },
                        { id: "SPEEDLOG", label: "SPEEDLOG", maxPhotos: 2 },
                        { id: "AIS", label: "AIS", maxPhotos: 2 }
                    ]
                },
                { id: "E4", title: "4. Update charts according to the voyage and in weekly basis (4 photos)", maxPhotos: 4 }
            ]
        },
        {
            groupId: "RADAR",
            groupTitle: "RADARS",
            items: [
                { id: "R1", title: "1. TX hours since last magnetron replacement (2 photos)", maxPhotos: 2 },
                { id: "R2", title: "2. Performance monitor test (2 photos)", maxPhotos: 2 },
                {
                    id: "R3",
                    title: "3. Proper indication of GPS, SPEED LOG, GYRO (2 photos for each)",
                    sections: [
                        { id: "GPS", label: "GPS", maxPhotos: 2 },
                        { id: "SPEEDLOG", label: "SPEED LOG", maxPhotos: 2 },
                        { id: "GYRO", label: "GYRO", maxPhotos: 2 }
                    ]
                }
            ]
        }
    ];

    function downloadJSON(data, filename = "AVIQ-data.json") {
        const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();

        URL.revokeObjectURL(url);
    }


    function loadJSONFromFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    resolve(JSON.parse(reader.result));
                } catch (e) {
                    reject(e);
                }
            };
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }




    function showAutosaveStatus() {
        const el = document.getElementById("autosaveStatus");
        if (!el) return;
        el.classList.add("show");

        setTimeout(() => {
            el.classList.remove("show");
        }, 2000);
    }


    // ----------------- STORAGE -----------------
    function loadStoredImages() {
        try {
            const raw = localStorage.getItem(IMAGES_KEY);
            return raw ? JSON.parse(raw) : {};
        } catch {
            return {};
        }
    }

    function saveStoredImages() {
        localStorage.setItem(IMAGES_KEY, JSON.stringify(imagesState));
    }

    function loadStoredComments() {
        try {
            const raw = localStorage.getItem(COMMENTS_KEY);
            return raw ? JSON.parse(raw) : {};
        } catch {
            return {};
        }
    }

    function saveStoredComments(state) {
        localStorage.setItem(COMMENTS_KEY, JSON.stringify(state));
    }

    function loadObservations() {
        try {
            return JSON.parse(localStorage.getItem(OBS_KEY)) || [];
        } catch {
            return [];
        }
    }

    function saveObservations(data) {
        localStorage.setItem(OBS_KEY, JSON.stringify(data));
    }

    let imagesState = loadStoredImages();
    let commentsState = loadStoredComments();
    let observationsState = loadObservations();

    // ----------------- DOM -----------------
    const chaptersListEl = document.getElementById("chaptersList");
    const questionsContainerEl = document.getElementById("questionsContainer");
    const chapterHeaderEl = document.getElementById("chapterHeader");
    const menuToggleBtn = document.getElementById("menuToggle");
    const sidebarEl = document.getElementById("sidebar");
    const clearDataBtn = document.getElementById("clearDataBtn");
    const saveDataBtn = document.getElementById("saveDataBtn");
    const loadDataBtn = document.getElementById("loadDataBtn");
    const additionalItemsNavEl = document.getElementById("navAdditionalItems");
    const navObservationsEl = document.getElementById("navObservations");

    let currentChapterId = null;
    let currentMode = "chapter"; // "chapter" | "additional" | "observations"

    // ----------------- HELPERS -----------------
    function getChapters() {
        return chaptersRaw.map((ch) => ({
            id: ch.chapterId,
            label: `${ch.chapterCode} ${ch.chapterTitle}`.trim()
        }));
    }

    function getQuestionsForChapter(chapterId) {
        const chapter = chaptersRaw.find(ch => ch.chapterId === chapterId);
        if (!chapter) return { chapterTitle: "", questions: [] };

        const questions = (chapter.questions || []).map(q => ({
            id: q.id,
            code: q.code,
            text: q.text,
            guidance: q.guidance || ""
        }));

        return { chapterTitle: chapter.chapterTitle, questions };
    }

    async function compressImageToTarget(base64Str, targetKB = 100, maxDim = 1600) {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = base64Str;

            img.onload = () => {
                let width = img.width;
                let height = img.height;

                // Scale down to max dimension (preserve aspect ratio)
                if (width > height) {
                    if (width > maxDim) {
                        height = Math.round((height * maxDim) / width);
                        width = maxDim;
                    }
                } else {
                    if (height > maxDim) {
                        width = Math.round((width * maxDim) / height);
                        height = maxDim;
                    }
                }

                // Draw resized image
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);

                // Try compressing to 100 KB
                let quality = 0.75;
                let compressed = canvas.toDataURL("image/jpeg", quality);

                const targetBytes = targetKB * 1024;

                // Reduce quality until we hit target size or limit
                while (compressed.length > targetBytes && quality > 0.50) {
                    quality -= 0.05;
                    compressed = canvas.toDataURL("image/jpeg", quality);
                }

                resolve(compressed);
            };
        });
    }



    function convertToBase64(file) {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(file);
        });
    }

    // Thumbnails for regular & Additional Items imagesState
    function renderThumbnails(key, container) {
        container.innerHTML = "";

        const imgs = imagesState[key] || [];
        imgs.forEach((src, index) => {
            const wrapper = document.createElement("div");
            wrapper.className = "photo-thumb-wrapper";

            const imgEl = document.createElement("img");
            imgEl.className = "photo-thumb";
            imgEl.src = src;

            // Click to open fullscreen modal
            imgEl.addEventListener("click", () => {
                const modal = document.getElementById("imageModal");
                const modalImg = document.getElementById("imageModalImg");
                modalImg.src = src;
                modal.style.display = "block";
            });

            const delBtn = document.createElement("button");
            delBtn.className = "photo-delete-btn";
            delBtn.textContent = "×";
            delBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                imgs.splice(index, 1);
                imagesState[key] = imgs;
                saveStoredImages();
                renderThumbnails(key, container);
            });

            wrapper.appendChild(imgEl);
            wrapper.appendChild(delBtn);
            container.appendChild(wrapper);
        });
    }

    // ----------------- RENDER: CHAPTERS -----------------
    function renderChapters() {
        const chapters = getChapters();
        chaptersListEl.innerHTML = "";

        chapters.forEach((ch, i) => {
            const li = document.createElement("li");
            li.className = "chapter-item";
            li.dataset.chapterId = ch.id;

            const span = document.createElement("span");
            span.textContent = ch.label;

            const badge = document.createElement("small");
            badge.textContent = `#${i + 1}`;

            li.appendChild(span);
            li.appendChild(badge);

            li.addEventListener("click", () => {
                selectChapter(ch.id);
                sidebarEl.classList.remove("open");
            });

            chaptersListEl.appendChild(li);
        });
    }

    function markActiveChapter(chapterId) {
        const items = chaptersListEl.querySelectorAll(".chapter-item");
        items.forEach(item => {
            item.classList.toggle("active", item.dataset.chapterId === chapterId);
        });

        if (additionalItemsNavEl) {
            additionalItemsNavEl.classList.toggle("active",
                currentMode === "additional" && !chapterId
            );
        }
        if (navObservationsEl) {
            navObservationsEl.classList.toggle("active",
                currentMode === "observations" && !chapterId
            );
        }
    }

    // ----------------- RENDER: QUESTIONS (CHAPTER MODE) -----------------
    function renderQuestions(chapterId) {
        const { chapterTitle, questions } = getQuestionsForChapter(chapterId);

        chapterHeaderEl.innerHTML = `
            <h1>${chapterTitle}</h1>
            <p>${questions.length} question(s)</p>
        `;
        questionsContainerEl.innerHTML = "";

        questions.forEach(q => {
            const card = document.createElement("section");
            card.className = "question-card";
            card.dataset.questionId = q.id;

            // Header
            const headerDiv = document.createElement("div");
            headerDiv.className = "question-header";

            const labelDiv = document.createElement("div");
            labelDiv.className = "question-label";

            const codeSpan = document.createElement("span");
            codeSpan.className = "code";
            codeSpan.textContent = q.code;
            labelDiv.appendChild(codeSpan);

            const captionSpan = document.createElement("span");
            captionSpan.textContent = "Question";
            labelDiv.appendChild(captionSpan);

            headerDiv.appendChild(labelDiv);

            // Text
            const textDiv = document.createElement("div");
            textDiv.className = "question-text";
            textDiv.textContent = q.text;

            // Guidance
            const guidanceDiv = document.createElement("div");
            guidanceDiv.className = "guidance";
            const gTitle = document.createElement("div");
            gTitle.className = "guidance-title";
            gTitle.textContent = "Guidance Note:";
            const gBody = document.createElement("div");
            gBody.className = "guidance-body";
            gBody.textContent = q.guidance || "";
            guidanceDiv.appendChild(gTitle);
            guidanceDiv.appendChild(gBody);

            // Bottom row: comment + photo
            const bottomRow = document.createElement("div");
            bottomRow.className = "bottom-row";

            // Comment
            const commentGroup = document.createElement("div");
            commentGroup.className = "comment-group";
            const commentLabel = document.createElement("label");
            commentLabel.textContent = "Comments";
            const commentArea = document.createElement("textarea");
            commentArea.className = "comment-input";
            commentArea.rows = 2;
            const storedComment = commentsState[q.id];
            if (storedComment && storedComment.comment) {
                commentArea.value = storedComment.comment;
            }
            commentArea.addEventListener("input", () => {
                const current = commentsState[q.id] || {};
                current.comment = commentArea.value;
                commentsState[q.id] = current;
                saveStoredComments(commentsState);
            });
            commentGroup.appendChild(commentLabel);
            commentGroup.appendChild(commentArea);

            // Photos
            const photoGroup = document.createElement("div");
            photoGroup.className = "photo-group";
            const photoLabel = document.createElement("label");
            photoLabel.textContent = "Photos";
            const photoActions = document.createElement("div");
            photoActions.className = "photo-actions";

            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.accept = "image/*";
            fileInput.capture = "environment";
            fileInput.multiple = true;
            fileInput.className = "photo-input";

            const addPhotoBtn = document.createElement("button");
            addPhotoBtn.type = "button";
            addPhotoBtn.className = "btn btn-secondary small";
            addPhotoBtn.textContent = "Add photo";
            addPhotoBtn.addEventListener("click", () => fileInput.click());

            const photoList = document.createElement("div");
            photoList.className = "photo-list";

            const imgKey = q.id;
            renderThumbnails(imgKey, photoList);

            fileInput.addEventListener("change", async () => {
                const files = Array.from(fileInput.files);
                if (!imagesState[imgKey]) imagesState[imgKey] = [];
                for (const file of files) {
                    const base64 = await convertToBase64(file);
                    const compressed = await compressImageToTarget(base64, 100, 1200);
                    imagesState[imgKey].push(compressed);


                }
                saveStoredImages();
                renderThumbnails(imgKey, photoList);
            });

            photoActions.appendChild(addPhotoBtn);
            photoGroup.appendChild(photoLabel);
            photoGroup.appendChild(photoActions);
            photoGroup.appendChild(fileInput);
            photoGroup.appendChild(photoList);

            bottomRow.appendChild(commentGroup);
            bottomRow.appendChild(photoGroup);

            card.appendChild(headerDiv);
            card.appendChild(textDiv);
            card.appendChild(guidanceDiv);
            card.appendChild(bottomRow);

            questionsContainerEl.appendChild(card);
        });
    }

    // ----------------- RENDER: ADDITIONAL ITEMS -----------------
    function renderAdditionalItemsPage() {
        currentMode = "additional";
        currentChapterId = null;

        chapterHeaderEl.innerHTML = `
            <h1>Additional Items</h1>
            <p>Upload required photos and add comments for each item.</p>
        `;
        questionsContainerEl.innerHTML = "";

        ADDITIONAL_ITEMS.forEach(group => {
            const groupTitle = document.createElement("h2");
            groupTitle.className = "add-group-title";
            groupTitle.textContent = group.groupTitle;
            questionsContainerEl.appendChild(groupTitle);

            group.items.forEach(item => {
                const card = document.createElement("section");
                card.className = "question-card";
                card.dataset.itemId = item.id;

                const headerDiv = document.createElement("div");
                headerDiv.className = "question-header";

                const labelDiv = document.createElement("div");
                labelDiv.className = "question-label";

                const codeSpan = document.createElement("span");
                codeSpan.className = "code";
                codeSpan.textContent = item.id;
                labelDiv.appendChild(codeSpan);

                const captionSpan = document.createElement("span");
                captionSpan.textContent = "Additional Item";
                labelDiv.appendChild(captionSpan);

                headerDiv.appendChild(labelDiv);

                const textDiv = document.createElement("div");
                textDiv.className = "question-text";
                textDiv.textContent = item.title;

                const bottomRow = document.createElement("div");
                bottomRow.className = "bottom-row";

                // Comment (per item, not per section)
                const commentGroup = document.createElement("div");
                commentGroup.className = "comment-group";
                const commentLabel = document.createElement("label");
                commentLabel.textContent = "Comments";
                const commentArea = document.createElement("textarea");
                commentArea.className = "comment-input";
                commentArea.rows = 2;

                const commentKey = `ADD_COMMENT_${group.groupId}_${item.id}`;
                const storedC = commentsState[commentKey];
                if (storedC && storedC.comment) {
                    commentArea.value = storedC.comment;
                }
                commentArea.addEventListener("input", () => {
                    const current = commentsState[commentKey] || {};
                    current.comment = commentArea.value;
                    commentsState[commentKey] = current;
                    saveStoredComments(commentsState);
                });

                commentGroup.appendChild(commentLabel);
                commentGroup.appendChild(commentArea);

                // Photo section
                const photoGroup = document.createElement("div");
                photoGroup.className = "photo-group";
                const photoLabel = document.createElement("label");
                photoLabel.textContent = "Photos";
                photoGroup.appendChild(photoLabel);

                if (item.sections && Array.isArray(item.sections)) {
                    // Multi subsections (e.g. GPS / GYRO / SPEEDLOG / AIS)
                    const sectionsContainer = document.createElement("div");
                    sectionsContainer.className = "multi-photo-sections";

                    item.sections.forEach(sec => {
                        const secCard = document.createElement("div");
                        secCard.className = "photo-section-card";

                        const secTitle = document.createElement("div");
                        secTitle.className = "photo-section-title";
                        secTitle.textContent = sec.label;
                        secCard.appendChild(secTitle);

                        const secActions = document.createElement("div");
                        secActions.className = "photo-actions";

                        const secInput = document.createElement("input");
                        secInput.type = "file";
                        secInput.accept = "image/*";
                        secInput.capture = "environment";
                        secInput.multiple = true;
                        secInput.className = "photo-input";

                        const secBtn = document.createElement("button");
                        secBtn.type = "button";
                        secBtn.className = "btn btn-secondary small";
                        secBtn.textContent = "Add photo";
                        secBtn.addEventListener("click", () => secInput.click());

                        const secList = document.createElement("div");
                        secList.className = "photo-list";

                        const secKey = `ADD_${group.groupId}_${item.id}_${sec.id}`;
                        renderThumbnails(secKey, secList);

                        secInput.addEventListener("change", async () => {
                            const files = Array.from(secInput.files);
                            if (!imagesState[secKey]) imagesState[secKey] = [];

                            for (const file of files) {
                                if (imagesState[secKey].length >= sec.maxPhotos) {
                                    alert(`Maximum ${sec.maxPhotos} photos allowed for ${sec.label}.`);
                                    break;
                                }
                                const base64 = await convertToBase64(file);
                                const compressed = await compressImageToTarget(base64, 100, 1600);
                                imagesState[imgKey].push(compressed);


                            }
                            saveStoredImages();
                            renderThumbnails(secKey, secList);
                        });

                        secActions.appendChild(secBtn);
                        secCard.appendChild(secActions);
                        secCard.appendChild(secInput);
                        secCard.appendChild(secList);

                        sectionsContainer.appendChild(secCard);
                    });

                    photoGroup.appendChild(sectionsContainer);
                } else {
                    // Single bucket of photos
                    const photoActions = document.createElement("div");
                    photoActions.className = "photo-actions";

                    const fileInput = document.createElement("input");
                    fileInput.type = "file";
                    fileInput.accept = "image/*";
                    fileInput.capture = "environment";
                    fileInput.multiple = true;
                    fileInput.className = "photo-input";

                    const addPhotoBtn = document.createElement("button");
                    addPhotoBtn.type = "button";
                    addPhotoBtn.className = "btn btn-secondary small";
                    addPhotoBtn.textContent = "Add photo";
                    addPhotoBtn.addEventListener("click", () => fileInput.click());

                    const photoList = document.createElement("div");
                    photoList.className = "photo-list";

                    const imgKey = `ADD_${group.groupId}_${item.id}`;
                    renderThumbnails(imgKey, photoList);

                    fileInput.addEventListener("change", async () => {
                        const files = Array.from(fileInput.files);
                        if (!imagesState[imgKey]) imagesState[imgKey] = [];

                        for (const file of files) {
                            if (imagesState[imgKey].length >= item.maxPhotos) {
                                alert(`Maximum ${item.maxPhotos} photos allowed for this item.`);
                                break;
                            }
                            const base64 = await convertToBase64(file);
                            const compressed = await compressImageToTarget(base64, 100, 1600);
                            imagesState[imgKey].push(compressed);


                        }
                        saveStoredImages();
                        renderThumbnails(imgKey, photoList);
                    });

                    photoActions.appendChild(addPhotoBtn);
                    photoGroup.appendChild(photoActions);
                    photoGroup.appendChild(fileInput);
                    photoGroup.appendChild(photoList);
                }

                bottomRow.appendChild(commentGroup);
                bottomRow.appendChild(photoGroup);

                card.appendChild(headerDiv);
                card.appendChild(textDiv);
                card.appendChild(bottomRow);

                questionsContainerEl.appendChild(card);
            });
        });
    }

    // ----------------- RENDER: OBSERVATIONS -----------------
    function renderObservationsPage() {
        currentMode = "observations";
        currentChapterId = null;

        chapterHeaderEl.innerHTML = `
            <h1>Observations</h1>
            <p>Enter up to 30 observations with comments and photos.</p>
        `;
        questionsContainerEl.innerHTML = "";

        // Initialize 30 rows if empty
        if (observationsState.length === 0) {
            for (let i = 0; i < 30; i++) {
                observationsState.push({
                    aviRef: "",
                    item: "",
                    observation: "",
                    obsNr: "",
                    comment: "",
                    photos: []
                });
            }
            saveObservations(observationsState);
        }

        const table = document.createElement("table");
        table.className = "observations-table";
        table.innerHTML = `
            <thead>
                <tr>
                    <th>AVIQ Ref</th>
                    <th>Item</th>
                    <th>Observation</th>
                    <th>Photo</th>
                    <th>Obs Nr</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        const tbody = table.querySelector("tbody");

        observationsState.forEach((row, index) => {
            const tr = document.createElement("tr");

            // AVIQ Ref
            const tdAviq = document.createElement("td");
            const inputAviq = document.createElement("input");
            inputAviq.value = row.aviRef;
            inputAviq.oninput = () => {
                observationsState[index].aviRef = inputAviq.value;
                saveObservations(observationsState);
            };
            tdAviq.appendChild(inputAviq);

            // Item
            const tdItem = document.createElement("td");
            const inputItem = document.createElement("input");
            inputItem.value = row.item;
            inputItem.oninput = () => {
                observationsState[index].item = inputItem.value;
                saveObservations(observationsState);
            };
            tdItem.appendChild(inputItem);

            // Observation
            const tdObs = document.createElement("td");
            const inputObs = document.createElement("input");
            inputObs.value = row.observation;
            inputObs.oninput = () => {
                observationsState[index].observation = inputObs.value;
                saveObservations(observationsState);
            };
            tdObs.appendChild(inputObs);

            // Photo cell
            const tdPhoto = document.createElement("td");
            tdPhoto.className = "observations-photo-cell";

            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.accept = "image/*";
            fileInput.capture = "environment";
            fileInput.multiple = true;
            fileInput.style.display = "none";

            const addPhotoBtn = document.createElement("button");
            addPhotoBtn.className = "btn btn-secondary small";
            addPhotoBtn.textContent = "+";
            addPhotoBtn.onclick = () => fileInput.click();

            tdPhoto.appendChild(addPhotoBtn);
            tdPhoto.appendChild(fileInput);

            function refreshThumbs() {
                tdPhoto.querySelectorAll(".observation-photo-thumb-wrapper").forEach(e => e.remove());

                row.photos.forEach((src, pIndex) => {
                    const wrap = document.createElement("div");
                    wrap.className = "observation-photo-thumb-wrapper";

                    const img = document.createElement("img");
                    img.className = "observation-photo-thumb";
                    img.src = src;
                    img.onclick = () => {
                        const modal = document.getElementById("imageModal");
                        const modalImg = document.getElementById("imageModalImg");
                        modalImg.src = src;
                        modal.style.display = "block";
                    };

                    const delBtn = document.createElement("button");
                    delBtn.className = "photo-delete-btn";
                    delBtn.textContent = "×";
                    delBtn.onclick = () => {
                        row.photos.splice(pIndex, 1);
                        saveObservations(observationsState);
                        refreshThumbs();
                    };

                    wrap.appendChild(img);
                    wrap.appendChild(delBtn);
                    tdPhoto.appendChild(wrap);
                });
            }

            refreshThumbs();

            fileInput.onchange = async () => {
                const files = Array.from(fileInput.files);
                for (let f of files) {
                    const base64 = await convertToBase64(f);
                    row.photos.push(base64);
                }
                saveObservations(observationsState);
                refreshThumbs();
            };

            // Obs Nr
            const tdNr = document.createElement("td");
            const inputNr = document.createElement("input");
            inputNr.value = row.obsNr;
            inputNr.oninput = () => {
                observationsState[index].obsNr = inputNr.value;
                saveObservations(observationsState);
            };
            tdNr.appendChild(inputNr);

            tr.appendChild(tdAviq);
            tr.appendChild(tdItem);
            tr.appendChild(tdObs);
            tr.appendChild(tdPhoto);
            tr.appendChild(tdNr);
            tbody.appendChild(tr);

            // Comment row
            const commentRow = document.createElement("tr");
            const commentCell = document.createElement("td");
            commentCell.colSpan = 5;

            const commentBox = document.createElement("textarea");
            commentBox.className = "observation-comment";
            commentBox.placeholder = "Comment.";
            commentBox.value = row.comment;
            commentBox.oninput = () => {
                observationsState[index].comment = commentBox.value;
                saveObservations(observationsState);
            };

            commentCell.appendChild(commentBox);
            commentRow.appendChild(commentCell);
            tbody.appendChild(commentRow);
        });

        questionsContainerEl.appendChild(table);
        markActiveChapter(null);
    }

    // ----------------- SELECT MODE -----------------
    function selectChapter(chapterId) {
        currentMode = "chapter";
        currentChapterId = chapterId;
        if (additionalItemsNavEl) additionalItemsNavEl.classList.remove("active");
        if (navObservationsEl) navObservationsEl.classList.remove("active");
        markActiveChapter(chapterId);
        renderQuestions(chapterId);
    }

    function selectAdditionalItems() {
        currentMode = "additional";
        currentChapterId = null;
        if (additionalItemsNavEl) additionalItemsNavEl.classList.add("active");
        if (navObservationsEl) navObservationsEl.classList.remove("active");
        markActiveChapter(null);
        renderAdditionalItemsPage();
    }

    function selectObservations() {
        currentMode = "observations";
        currentChapterId = null;
        if (additionalItemsNavEl) additionalItemsNavEl.classList.remove("active");
        if (navObservationsEl) navObservationsEl.classList.add("active");
        markActiveChapter(null);
        renderObservationsPage();
    }

    // ----------------- INIT -----------------
    document.addEventListener("DOMContentLoaded", () => {
        if (!Array.isArray(chaptersRaw) || chaptersRaw.length === 0) {
            console.warn("DATA_TEMPLATE is empty or not loaded.");
        }

        renderChapters();

        const chapters = getChapters();
        if (chapters.length > 0) {
            selectChapter(chapters[0].id);
        }

        if (menuToggleBtn) {
            menuToggleBtn.addEventListener("click", () => {
                sidebarEl.classList.toggle("open");
            });
        }

        function autosaveAll() {
            saveStoredComments(commentsState);
            saveStoredImages();
            saveObservations(observationsState);
            showAutosaveStatus();
        }

        // Autosave every 3 minutes
        setInterval(() => {
            autosaveAll();
        }, 3 * 60 * 1000); // 3 minutes



        if (saveDataBtn) {
            saveDataBtn.addEventListener("click", () => {

                // 1. GET RAW VESSEL NAME TEXT
                let vesselNameText = document.querySelector("#vesselName span").textContent.trim();

                // 2. REMOVE PREFIX (M/V, MV, M. V., etc.)
                vesselNameText = vesselNameText.replace(/^(M\/V|MV|M\.V\.|M\. V\.|M V|m\/v|mv)\s*/i, "");

                // 3. REMOVE EVERYTHING AFTER " - "
                vesselNameText = vesselNameText.split(" - ")[0].trim();

                // 4. SANITIZE NAME
                const safeVesselName = vesselNameText.replace(/[^a-zA-Z0-9-_]/g, "_");

                // 5. DATE STAMP
                const now = new Date();
                const yyyy = now.getFullYear();
                const mm = String(now.getMonth() + 1).padStart(2, "0");
                const dd = String(now.getDate()).padStart(2, "0");
                const dateStamp = `${yyyy}${mm}${dd}`;

                // 6. SUGGESTED FILENAME
                let suggestedName = `${safeVesselName}_${dateStamp}`;

                // 7. ASK USER FOR FILENAME
                let userFilename = prompt("Enter filename:", suggestedName);

                if (!userFilename) {
                    alert("Save cancelled.");
                    return;
                }

                userFilename = userFilename.replace(/[^a-zA-Z0-9-_]/g, "_");

                const finalFilename = `${userFilename}.json`;

                // 8. PACKAGE EXPORT DATA
                const exportData = {
                    commentsState,
                    imagesState,
                    observationsState
                };

                // 9. DOWNLOAD JSON FILE
                downloadJSON(exportData, finalFilename);

                alert("Data saved to file: " + finalFilename);
            });
        }





        if (loadDataBtn) {
            loadDataBtn.addEventListener("click", () => {

                // Trigger OS-native file picker
                const fileInput = document.getElementById("loadFileInput");
                fileInput.value = ""; // reset to allow selecting same file twice
                fileInput.click();

                fileInput.onchange = async () => {
                    const file = fileInput.files[0];
                    if (!file) return; // user cancelled

                    try {
                        // File → JSON
                        const text = await file.text();
                        const json = JSON.parse(text);

                        // Load states
                        commentsState = json.commentsState || {};
                        imagesState = json.imagesState || {};
                        observationsState = json.observationsState || [];

                        // Persist to LocalStorage
                        saveStoredComments(commentsState);
                        saveStoredImages();
                        saveObservations(observationsState);

                        alert("Data loaded successfully from selected file.");

                        // Re-render based on current mode
                        if (currentMode === "chapter" && currentChapterId) {
                            renderQuestions(currentChapterId);
                        } else if (currentMode === "additional") {
                            renderAdditionalItemsPage();
                        } else if (currentMode === "observations") {
                            renderObservationsPage();
                        }

                    } catch (err) {
                        alert("Invalid or corrupted file.\n\nPlease ensure you selected a valid AVIQ JSON file.");
                    }
                };
            });
        }





        if (clearDataBtn) {
            clearDataBtn.addEventListener("click", () => {
                if (!confirm("Clear all stored comments, photos and observations on this device?")) return;
                commentsState = {};
                imagesState = {};
                observationsState = [];
                saveStoredComments({});
                saveStoredImages();
                localStorage.removeItem(OBS_KEY);

                if (currentMode === "chapter" && currentChapterId) {
                    renderQuestions(currentChapterId);
                } else if (currentMode === "additional") {
                    renderAdditionalItemsPage();
                } else if (currentMode === "observations") {
                    renderObservationsPage();
                }
            });
        }

        if (additionalItemsNavEl) {
            additionalItemsNavEl.addEventListener("click", () => {
                selectAdditionalItems();
                sidebarEl.classList.remove("open");
            });
        }

        if (navObservationsEl) {
            navObservationsEl.addEventListener("click", () => {
                selectObservations();
                sidebarEl.classList.remove("open");
            });
        }

        // Fullscreen image modal close behaviour
        const imageModal = document.getElementById("imageModal");
        const imageModalImg = document.getElementById("imageModalImg");
        const imageModalClose = document.getElementById("imageModalClose");

        if (imageModal && imageModalImg && imageModalClose) {
            imageModalClose.onclick = () => {
                imageModal.style.display = "none";
            };

            imageModal.onclick = (e) => {
                if (e.target === imageModal) {
                    imageModal.style.display = "none";
                }
            };
        }
    });
})();
