// 檢查 Cookie 同意狀態
function checkCookieConsent() {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
        document.getElementById("cookie-consent").classList.remove("hidden");
    }
}

// 接受 Cookie
function acceptCookies() {
    localStorage.setItem("cookieConsent", "true");
    document.getElementById("cookie-consent").classList.add("hidden");
}

// 關閉 Cookies 通知視窗
function closeCookieConsent() {
    const consentBox = document.getElementById("cookie-consent");
    consentBox.classList.add("hidden");
}



// 頁面載入時檢查同意狀態
window.onload = function() {
    checkCookieConsent();
};

// 開啟模態框
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('show'); // 添加顯示類
    modal.querySelector('.modal-content').classList.remove('hide'); // 確保隱藏動畫類移除
    document.body.style.overflow = "hidden"; // 禁止背景滾動
}

// 關閉模態框
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const modalContent = modal.querySelector('.modal-content');
    modalContent.classList.add('hide'); // 添加隱藏動畫類
    setTimeout(() => {
        modal.classList.remove('show'); // 等待動畫完成後隱藏模態框
    }, 300); // 時間與動畫時長一致
    document.body.style.overflow = "auto"; // 恢復背景滾動
}

// 點擊背景關閉模態框
window.onclick = function (event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            closeModal(modal.id);
        }
    });
};


// 平滑滾動到特定區域
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// 滾動到頂部
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// 監聽滾動事件
window.addEventListener("scroll", function () {
    const button = document.getElementById("back-to-top");
    if (window.scrollY > 200) {
        button.style.display = "block"; // 顯示按鈕
    } else {
        button.style.display = "none"; // 隱藏按鈕
    }
});

// 放大或縮小圖片
function zoomImage(action, imageId) {
    const image = document.getElementById(imageId);
    let currentScale = image.style.transform.match(/scale\((.*?)\)/);

    // 解析當前縮放比例，默認為 1
    currentScale = currentScale ? parseFloat(currentScale[1]) : 1;

    // 放大縮小邏輯
    if (action === 'in') {
        // 放大圖片
        currentScale += 0.1;
    } else if (action === 'out') {
        // 縮小圖片
        currentScale = Math.max(1, currentScale - 0.1); // 最小縮放比例為 0.1
    }

    // 設置新的縮放比例
    image.style.transform = `scale(${currentScale})`;
}

let isDragging = false;
let startX, startY, initialLeft, initialTop;

function enableDrag(imageId) {
    const image = document.getElementById(imageId);

    image.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;

        // 獲取圖片的當前位移
        const rect = image.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;

        image.style.position = "absolute";
    });

    image.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const dx = e.clientX - startX; // 計算水平移動距離
        const dy = e.clientY - startY; // 計算垂直移動距離

        // 更新圖片的位置
        image.style.left = `${initialLeft + dx}px`;
        image.style.top = `${initialTop + dy}px`;
    });

    image.addEventListener("mouseup", () => {
        isDragging = false;
    });

    image.addEventListener("mouseleave", () => {
        isDragging = false;
    });
}

// 啟用拖動功能
enableDrag("modal1-image");
