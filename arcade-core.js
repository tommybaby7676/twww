/**
 * Pocket Smash 2D - Kenney Studio Complete Engine
 * 1. 獨立三關全彩高畫質背景 (Cover 滿版防拉伸自適應)
 * 2. 大廳海灘高斯模糊背景 (Glassmorphism 虛化)
 * 3. 56px 高清動物領航員立繪與彈跳手感
 * 4. 修復結算證書橘色標籤跑版問題
 */
(function() {
  const mount = document.getElementById("arenaMountContainer");
  if (!mount) return;

  // 動態構建 Kenney 淺色掌機 DOM
  mount.innerHTML = `
    <div class="handheld-shell" id="handheldShell">
      <header class="console-top">
        <button class="btn-kenney-sm blue" id="btnExitArena">← TRANG CHỦ</button>
        <div class="stage-badge-kenney" id="stageIndicator">MÀN 1 / 3</div>
        <div class="console-icons">
          <button class="btn-kenney-icon" id="btnAudioToggle" title="Âm thanh">
            <svg id="icoAudioOn" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
            <svg id="icoAudioOff" viewBox="0 0 24 24" style="display:none;"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
          </button>
          <button class="btn-kenney-icon" id="btnSettingsOpen" title="Cài đặt">
            <svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
          </button>
        </div>
      </header>

      <main class="screen-housing" id="screenHousing">
        <div class="hud-bar">
          <div class="hud-item-kenney">
            <span class="hud-lbl">ĐIỂM</span>
            <span class="hud-num" id="uiScore">0</span>
          </div>
          <div class="hud-item-kenney">
            <div class="heart-tray" id="uiHearts"></div>
          </div>
          <div class="hud-item-kenney">
            <span class="hud-lbl">COMBO</span>
            <span class="hud-num" id="uiCombo" style="color:#e74c3c;">x1</span>
          </div>
        </div>

        <canvas id="gameCanvas"></canvas>

        <!-- 開局大廳 (帶海灘高斯模糊背景) -->
        <div class="modal-view" id="viewLobby">
          <div class="modal-blur-bg" id="lobbyBlurBg"></div>
          <div class="lobby-card-kenney">
            <div class="lobby-badge-kenney">KENNEY STUDIO 2D</div>
            <div class="lobby-title-kenney">CHỌN LINH THÚ DẪN ĐƯỜNG</div>

            <div class="pilot-carousel">
              <div class="pilot-card active" data-pilot="panda">
                <img src="./animal-panda.png" alt="Panda">
                <span>Gấu Trúc</span>
              </div>
              <div class="pilot-card" data-pilot="tiger">
                <img src="./animal-tiger.png" alt="Tiger">
                <span>Bạch Hổ</span>
              </div>
              <div class="pilot-card" data-pilot="pig">
                <img src="./animal-pig.png" alt="Pig">
                <span>Heo Hồng</span>
              </div>
              <div class="pilot-card" data-pilot="lion">
                <img src="./animal-lion.png" alt="Lion">
                <span>Sư Tử</span>
              </div>
              <div class="pilot-card" data-pilot="giraffe">
                <img src="./animal-giraffe.png" alt="Giraffe">
                <span>Hươu Đốm</span>
              </div>
            </div>

            <div class="perk-banner-kenney">
              <div class="perk-head-kenney">
                <span id="perkHeroName">GẤU TRÚC (TĨNH TÂM)</span>
                <span style="color:#27ae60;">BẬC S</span>
              </div>
              <div class="perk-desc-kenney" id="perkHeroDesc">
                Thanh đỡ mở rộng thêm 15%. Phòng thủ vững vàng trước các đường bóng hẹp.
              </div>
            </div>

            <div class="diff-row-kenney">
              <button class="diff-btn-kenney" data-diff="0">DỄ</button>
              <button class="diff-btn-kenney active" data-diff="1">VỪA</button>
              <button class="diff-btn-kenney" data-diff="2">ÁC MỘNG</button>
            </div>

            <button class="btn-kenney-3d green" id="btnLaunchGame">BẮT ĐẦU XUẤT PHÁT</button>
          </div>
        </div>

        <!-- 關卡突破過場 -->
        <div class="modal-view" id="viewStageClear" style="display:none;">
          <div class="modal-blur-bg"></div>
          <div class="lobby-card-kenney" style="text-align:center;">
            <div class="lobby-badge-kenney" style="color:#d68910;">VƯỢT MÀN XUẤT SẮC!</div>
            <div class="lobby-title-kenney" id="stageClearHeading">HOÀN THÀNH MÀN 1!</div>
            <p style="font-size:12.5px; color:#64748b; margin-bottom:18px;">
              Tốc độ bóng tăng thêm 20%. Chuẩn bị phản xạ ở địa hình tiếp theo!
            </p>
            <button class="btn-kenney-3d green" id="btnContinueNext">TIẾP TỤC</button>
          </div>
        </div>

        <!-- 失敗結算 (Near-Miss 激勵) -->
        <div class="modal-view" id="viewGameOver" style="display:none;">
          <div class="modal-blur-bg"></div>
          <div class="lobby-card-kenney" style="text-align:center;">
            <div class="lobby-badge-kenney" style="color:#c0392b;">KẾT THÚC LƯỢT</div>
            <div class="lobby-title-kenney">HẾT MẠNG ĐỠ BÓNG</div>
            <p style="font-size:13px; color:#2d3748; font-weight:700; margin-bottom:6px;" id="overNearMiss">
              Tiếc quá! Bạn đã dọn sạch 80% khối gạch màn này!
            </p>
            <p style="font-size:11.5px; color:#718096; margin-bottom:16px;">
              Điểm đạt được: <span id="overFinalScore" style="color:#d68910; font-weight:800;">0</span>
            </p>
            <button class="btn-kenney-3d orange" id="btnRetryStage">THỬ LẠI NGAY (PHỤC THÙ)</button>
          </div>
        </div>

        <!-- S+ 像素證書彩蛋 (已修復橘色標籤跑版問題) -->
        <div class="modal-view" id="viewCertificate" style="display:none;">
          <div class="modal-blur-bg"></div>
          <div class="cert-card-kenney">
            <div class="cert-crown-kenney">🎉 BÍ MẬT ĐÃ MỞ KHÓA!</div>
            <div class="cert-hero-kenney">
              <img id="certHeroImg" src="./animal-panda.png" alt="Hero">
            </div>
            <div class="cert-title-kenney">BẰNG VINH DANH S+</div>
            <div class="cert-sub-kenney">BẬC THẦY PHẢN XẠ VẬT LÝ ARCADE 2026</div>

            <div class="cert-metrics-kenney">
              <div>
                <div class="cert-lbl">TỔNG ĐIỂM SỐ</div>
                <div class="cert-val" id="certScore">18,450</div>
              </div>
              <div>
                <div class="cert-lbl">COMBO TỐI ĐA</div>
                <div class="cert-val" id="certCombo" style="color:#e74c3c;">x8</div>
              </div>
            </div>

            <p style="font-size:10.5px; color:#718096; margin-bottom:14px;">
              Xác nhận người chơi đã vượt qua thành công 3 tầng thử thách bao gồm Màn Ác Mộng.
            </p>

            <div style="display:flex; gap:8px;">
              <button class="btn-kenney-sm orange" style="flex:1;" id="btnSaveCert">LƯU ẢNH</button>
              <button class="btn-kenney-sm blue" style="flex:1;" id="btnReplayAll">CHƠI LẠI</button>
            </div>
          </div>
        </div>
      </main>

      <footer class="console-bottom">
        <div class="grip-groove"></div>
        <div class="grip-txt">VÙNG CẢM ỨNG ĐIỀU KHIỂN</div>
      </footer>
    </div>

    <!-- Kenney 淺色設定抽屜 -->
    <div class="drawer-overlay" id="drawerOverlay">
      <div class="drawer-sheet-kenney">
        <div class="drawer-head-kenney">
          <strong style="font-family:'Chakra Petch'; font-size:15px; color:#2d3748;">TÙY CHỌN HỆ THỐNG</strong>
          <button class="drawer-close-kenney" id="drawerCloseBtn">&times;</button>
        </div>

        <div class="setting-row-kenney">
          <div>
            <div style="font-weight:700; color:#2d3748;">Màu thanh đỡ (Paddle)</div>
            <div style="font-size:11px; color:#718096;">Đổi màu thanh đỡ va chạm</div>
          </div>
          <div class="btn-group-kenney">
            <button class="btn-toggle-kenney active" id="skinPadBlue">Lam</button>
            <button class="btn-toggle-kenney" id="skinPadRed">Xích</button>
          </div>
        </div>

        <div class="setting-row-kenney">
          <div>
            <div style="font-weight:700; color:#2d3748;">Kiểu bóng nảy (Ball)</div>
            <div style="font-size:11px; color:#718096;">Chất liệu phản xạ động năng</div>
          </div>
          <div class="btn-group-kenney">
            <button class="btn-toggle-kenney active" id="skinBallBlue">Ngọc</button>
            <button class="btn-toggle-kenney" id="skinBallGrey">Thép</button>
          </div>
        </div>

        <div class="setting-row-kenney">
          <div>
            <div style="font-weight:700; color:#2d3748;">Rung phản hồi (Haptics)</div>
            <div style="font-size:11px; color:#718096;">Rung nhẹ khi đỡ bóng</div>
          </div>
          <input type="checkbox" id="chkHaptics" checked style="width:22px; height:22px; accent-color:#2ecc71;">
        </div>

        <div style="margin-top:14px; padding-top:12px; border-top:1px solid #e2e8f0; font-size:11px; color:#718096; line-height:1.5;">
          <p><strong>Hiệu Năng Canvas:</strong> Ứng dụng chạy trực tiếp trên trình duyệt với 3 bản đồ cảnh quan chuẩn 60 FPS.</p>
          <p style="margin-top:4px;"><strong>Quyền Riêng Tư:</strong> Không thu thập dữ liệu cá nhân (PII). Điểm số chỉ lưu cục bộ tạm thời.</p>
        </div>
      </div>
    </div>
  `;

  // 動態注入 CSS
  const styleEl = document.createElement("style");
  styleEl.innerHTML = `
    .handheld-shell {
      width: 100%; max-width: 440px; height: 100%; height: 100dvh;
      background: #f1f5f9;
      display: flex; flex-direction: column; position: relative; margin: 0 auto;
      border-left: 3px solid #cbd5e1; border-right: 3px solid #cbd5e1;
      padding: env(safe-area-inset-top, 6px) 10px env(safe-area-inset-bottom, 6px);
      user-select: none; -webkit-user-select: none;
    }
    .console-top {
      display: flex; justify-content: space-between; align-items: center;
      padding: 6px 4px; flex-shrink: 0; background: #ffffff;
      border: 2px solid #cbd5e1; border-bottom: 3.5px solid #cbd5e1;
      border-radius: 10px; margin-bottom: 8px;
    }
    .btn-kenney-sm {
      font-family: 'Chakra Petch', sans-serif; font-size: 11px; font-weight: 800;
      padding: 5px 10px; border-radius: 6px; cursor: pointer; color: #fff;
    }
    .btn-kenney-sm.blue {
      background: #3498db; border: 1.5px solid #2980b9; border-bottom: 3px solid #1f618d;
    }
    .btn-kenney-sm.orange {
      background: #f39c12; border: 1.5px solid #d68910; border-bottom: 3px solid #b9770e;
    }
    .btn-kenney-sm:active { transform: translateY(2px); border-bottom-width: 1.5px; }

    .stage-badge-kenney {
      background: #fef3c7; border: 1.5px solid #f59e0b; color: #b45309;
      font-family: 'Chakra Petch', sans-serif; font-size: 11.5px; font-weight: 800;
      padding: 3px 10px; border-radius: 6px;
    }
    .console-icons { display: flex; gap: 6px; }
    .btn-kenney-icon {
      background: #f8fafc; border: 1.5px solid #cbd5e1; border-bottom: 3px solid #94a3b8;
      width: 32px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center;
      cursor: pointer; color: #475569;
    }
    .btn-kenney-icon:active { transform: translateY(2px); border-bottom-width: 1.5px; }
    .btn-kenney-icon svg { width: 16px; height: 16px; fill: currentColor; }

    .screen-housing {
      flex: 1; width: 100%; min-height: 0; background: #e2e8f0;
      border: 3px solid #cbd5e1; border-radius: 12px; position: relative;
      overflow: hidden; display: flex;
    }
    .hud-bar {
      position: absolute; top: 8px; left: 10px; right: 10px;
      display: flex; justify-content: space-between; align-items: center;
      pointer-events: none; z-index: 10;
    }
    .hud-item-kenney {
      background: rgba(255, 255, 255, 0.9); border: 1.5px solid #cbd5e1; border-bottom: 2.5px solid #94a3b8;
      border-radius: 6px; padding: 3px 8px; display: flex; align-items: center; gap: 5px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.06);
    }
    .hud-lbl { color: #64748b; font-size: 9.5px; font-weight: 800; font-family: 'Chakra Petch', sans-serif; }
    .hud-num { font-size: 14px; font-weight: 800; color: #1e293b; font-family: 'Chakra Petch', sans-serif; }
    .heart-tray { display: flex; gap: 3px; }
    .heart-ico { color: #e74c3c; font-size: 13px; line-height: 1; }
    .heart-ico.lost { color: #cbd5e1; }

    canvas { width: 100%; height: 100%; display: block; touch-action: none; }

    .modal-view {
      position: absolute; inset: 0; overflow: hidden;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 14px; z-index: 20;
    }
    .modal-blur-bg {
      position: absolute; inset: -15px;
      background-size: cover; background-position: center;
      filter: blur(14px) brightness(0.92);
      transform: scale(1.08); z-index: 1;
    }

    .lobby-card-kenney {
      position: relative; z-index: 2; width: 100%; max-width: 320px;
      background: rgba(255, 255, 255, 0.94); border: 2px solid #cbd5e1;
      border-bottom: 4px solid #94a3b8; border-radius: 14px; padding: 18px 14px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.12); text-align: center;
    }
    .lobby-badge-kenney {
      font-size: 10px; font-weight: 800; letter-spacing: 1px; color: #2563eb;
      font-family: 'Chakra Petch', sans-serif; margin-bottom: 4px;
    }
    .lobby-title-kenney {
      font-size: 16px; font-weight: 800; color: #1e293b; margin-bottom: 12px;
      font-family: 'Chakra Petch', sans-serif;
    }

    .pilot-carousel { display: flex; gap: 6px; margin-bottom: 12px; justify-content: center; width: 100%; }
    .pilot-card {
      flex: 1; max-width: 56px; height: 60px; background: #ffffff;
      border: 1.5px solid #cbd5e1; border-bottom: 3px solid #cbd5e1; border-radius: 8px;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      cursor: pointer; transition: all 0.1s ease;
    }
    .pilot-card img { width: 32px; height: 32px; object-fit: contain; }
    .pilot-card span { font-size: 8.5px; font-weight: 800; color: #475569; margin-top: 2px; }
    .pilot-card.active {
      border-color: #3498db; border-bottom-color: #2980b9; background: #ebf5fb;
      transform: translateY(-2px);
    }
    .pilot-card.active span { color: #2980b9; }

    .perk-banner-kenney {
      background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px;
      padding: 8px 10px; margin-bottom: 12px; text-align: left;
    }
    .perk-head-kenney {
      font-size: 11px; font-weight: 800; color: #d97706; display: flex; justify-content: space-between;
      font-family: 'Chakra Petch', sans-serif;
    }
    .perk-desc-kenney { font-size: 10.5px; color: #64748b; margin-top: 2px; line-height: 1.4; }

    .diff-row-kenney { display: flex; gap: 6px; margin-bottom: 14px; }
    .diff-btn-kenney {
      flex: 1; padding: 6px 0; font-family: 'Chakra Petch', sans-serif; font-size: 10px; font-weight: 800;
      border-radius: 6px; border: 1.5px solid #cbd5e1; border-bottom: 3px solid #94a3b8;
      background: #ffffff; color: #64748b; cursor: pointer;
    }
    .diff-btn-kenney.active {
      background: #fef3c7; border-color: #f59e0b; border-bottom-color: #d97706; color: #b45309;
    }

    .btn-kenney-3d {
      width: 100%; border: none; border-radius: 8px; font-family: 'Chakra Petch', sans-serif;
      font-size: 15px; font-weight: 900; padding: 12px 0; cursor: pointer; color: #fff;
      letter-spacing: 0.5px; transition: transform 0.08s ease;
    }
    .btn-kenney-3d.green {
      background: #2ecc71; border: 2px solid #27ae60; border-bottom: 5px solid #1e8449;
    }
    .btn-kenney-3d.orange {
      background: #f39c12; border: 2px solid #d68910; border-bottom: 5px solid #b9770e;
    }
    .btn-kenney-3d:active { transform: translateY(3px); border-bottom-width: 2px; }

    /* 榮譽證書：橘色標籤置中嵌合 */
    .cert-card-kenney {
      position: relative; z-index: 2; width: 100%; max-width: 310px;
      background: rgba(255, 255, 255, 0.95); border: 2px solid #f59e0b;
      border-bottom: 5px solid #d97706; border-radius: 14px; padding: 16px 14px;
      box-shadow: 0 10px 25px rgba(245, 158, 11, 0.25); text-align: center;
    }
    .cert-crown-kenney {
      display: inline-block;
      background: #f59e0b; color: #fff; font-family: 'Chakra Petch', sans-serif;
      font-size: 11px; font-weight: 900; padding: 4px 14px; border-radius: 20px;
      margin-bottom: 10px; box-shadow: 0 2px 6px rgba(245, 158, 11, 0.4);
    }
    .cert-hero-kenney {
      width: 52px; height: 52px; margin: 0 auto 6px; background: #fef3c7;
      border: 1.5px dashed #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center;
    }
    .cert-hero-kenney img { max-width: 80%; max-height: 80%; }
    .cert-title-kenney { font-size: 16px; font-weight: 900; color: #1e293b; font-family: 'Chakra Petch', sans-serif; }
    .cert-sub-kenney { font-size: 9.5px; color: #b45309; margin-bottom: 8px; }
    .cert-metrics-kenney {
      display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; margin: 8px 0;
      background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px; border-radius: 8px;
    }
    .cert-lbl { font-size: 9px; color: #64748b; font-weight: 700; }
    .cert-val { font-size: 15px; font-weight: 900; color: #1e293b; font-family: 'Chakra Petch', sans-serif; }

    .console-bottom { padding: 6px 4px 2px; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; gap: 3px; }
    .grip-groove { width: 50px; height: 3px; background: #cbd5e1; border-radius: 2px; }
    .grip-txt { font-size: 9px; font-weight: 800; color: #94a3b8; font-family: 'Chakra Petch', sans-serif; }

    .drawer-overlay {
      position: absolute; inset: 0; background: rgba(0,0,0,0.5);
      z-index: 100; display: none; align-items: flex-end;
    }
    .drawer-sheet-kenney {
      width: 100%; max-height: 75%; background: #ffffff; border-top: 3px solid #cbd5e1;
      border-radius: 14px 14px 0 0; padding: 18px 16px; display: flex; flex-direction: column;
      overflow-y: auto; font-size: 12.5px;
    }
    .drawer-head-kenney {
      display: flex; justify-content: space-between; align-items: center;
      border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 12px;
    }
    .drawer-close-kenney { background: none; border: none; color: #64748b; font-size: 22px; cursor: pointer; }
    .setting-row-kenney {
      display: flex; justify-content: space-between; align-items: center;
      padding: 10px 0; border-bottom: 1px solid #f1f5f9;
    }
    .btn-group-kenney { display: flex; gap: 6px; }
    .btn-toggle-kenney {
      padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700;
      border: 1.5px solid #cbd5e1; border-bottom: 3px solid #94a3b8;
      background: #f8fafc; color: #64748b; cursor: pointer;
    }
    .btn-toggle-kenney.active {
      border-color: #3498db; border-bottom-color: #2980b9; background: #ebf5fb; color: #2980b9;
    }
  `;
  document.head.appendChild(styleEl);

  // =========================================================================
  // Canvas 物理與獨立背景載入邏輯 (支援 WebP 與 JFIF 自動容錯)
  // =========================================================================
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const bezel = document.getElementById("screenHousing");

  // 1. 精靈圖集
  const atlas = new Image();
  atlas.src = "./spritesheet_double.png";
  let atlasReady = false;
  atlas.onload = () => { atlasReady = true; };

  // 2. 獨立載入 3 關背景圖 (支援自動 fallback)
  const STAGE_BG_IMAGES = [new Image(), new Image(), new Image()];

  function loadStageBg(img, webpName, jfifName) {
    img.src = "./" + webpName;
    img.onerror = () => { img.src = "./" + jfifName; };
  }
  loadStageBg(STAGE_BG_IMAGES[0], "bg-stage1.webp", "game1.jfif");
  loadStageBg(STAGE_BG_IMAGES[1], "bg-stage2.webp", "game2.jfif");
  loadStageBg(STAGE_BG_IMAGES[2], "bg-stage3.webp", "game3.jfif");

  // 3. 大廳海灘背景 (自動設定到模糊層)
  const lobbyBgImg = new Image();
  lobbyBgImg.src = "./bg-lobby.webp";
  lobbyBgImg.onerror = () => { lobbyBgImg.src = "./game.jfif"; };
  lobbyBgImg.onload = () => {
    document.querySelectorAll(".modal-blur-bg").forEach(el => {
      el.style.backgroundImage = `url('${lobbyBgImg.src}')`;
    });
  };

  // 4. 動物領航員立繪
  const PILOT_IMAGES = {
    panda: new Image(), tiger: new Image(), pig: new Image(), lion: new Image(), giraffe: new Image()
  };
  PILOT_IMAGES.panda.src = "./animal-panda.png";
  PILOT_IMAGES.tiger.src = "./animal-tiger.png";
  PILOT_IMAGES.pig.src = "./animal-pig.png";
  PILOT_IMAGES.lion.src = "./animal-lion.png";
  PILOT_IMAGES.giraffe.src = "./animal-giraffe.png";

  const SPRITES = {
    paddles: {
      blue: { x: 0, y: 196, w: 208, h: 48 },
      red:  { x: 0, y: 244, w: 208, h: 48 }
    },
    balls: {
      blue: { x: 108, y: 676, w: 44, h: 44 },
      grey: { x: 152, y: 676, w: 44, h: 44 }
    },
    star: { x: 196, y: 676, w: 40, h: 40 },
    bricks: [
      { x: 128, y: 420, w: 128, h: 64, pts: 40, color: "#e74c3c" },
      { x: 0,   y: 356, w: 128, h: 64, pts: 30, color: "#3498db" },
      { x: 0,   y: 484, w: 128, h: 64, pts: 20, color: "#2ecc71" },
      { x: 128, y: 548, w: 128, h: 64, pts: 50, color: "#f39c12" },
      { x: 128, y: 612, w: 128, h: 64, pts: 60, color: "#9b59b6" }
    ]
  };

  const PILOT_PERKS = {
    panda: { name: "GẤU TRÚC (TĨNH TÂM)", desc: "Thanh đỡ mở rộng thêm 15%. Phòng thủ vững vàng trước các đường bóng hẹp.", paddleScale: 1.15, comboBonus: 1.0, extraLife: 0, starMult: 1 },
    tiger: { name: "BẠCH HỔ (TỐC ĐỘ)", desc: "Gia tăng 25% điểm tích lũy Combo. Thích hợp cho cao thủ săn điểm.", paddleScale: 1.0, comboBonus: 1.25, extraLife: 0, starMult: 1 },
    pig:   { name: "HEO HỒNG (MAY MẮN)", desc: "Bắt đầu với 4 Mạng Sống (♥ x4). Tăng tối đa khả năng sống sót.", paddleScale: 1.0, comboBonus: 1.0, extraLife: 1, starMult: 1 },
    lion:  { name: "SƯ TỬ (QUYỀN UY)", desc: "Hiệu ứng bùng nổ sao gấp đôi mỗi khi phá gạch. Đòn đánh cực mãn nhãn.", paddleScale: 1.0, comboBonus: 1.0, extraLife: 0, starMult: 2 },
    giraffe: { name: "HƯƠU ĐỐM (LINH HOẠT)", desc: "Độ nhạy cảm ứng cực mượt, phản xạ nhanh nhạy trong tình huống khẩn cấp.", paddleScale: 1.05, comboBonus: 1.0, extraLife: 0, starMult: 1 }
  };

  let selectedPilotKey = 'panda';
  let selectedDiffIndex = 1;
  let currentPaddleSkin = 'blue';
  let currentBallSkin = 'blue';

  let audioCtx = null;
  let audioOn = true;
  function initAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  function playBeep(freq, type, dur) {
    if (!audioOn || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + dur);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + dur);
    } catch(e) {}
  }
  function triggerHaptic(ms) {
    const chk = document.getElementById("chkHaptics");
    if (chk && chk.checked && navigator.vibrate) {
      try { navigator.vibrate(ms); } catch(e){}
    }
  }

  let gameW = 400;
  let gameH = 600;
  let currentStage = 1;
  const maxStage = 3;
  let lives = 3;
  let maxLives = 3;
  let score = 0;
  let combo = 1;
  let isRunning = false;
  let loopId = null;

  let paddle = { x: 150, y: 520, w: 96, h: 22, bounceY: 0 };
  let ball = { x: 200, y: 490, r: 9, vx: 3.6, vy: -3.6, inPlay: false };
  let bricks = [];
  let particles = [];
  let popups = [];
  let ballTrails = [];
  let initialBrickCount = 0;

  const STAGE_CONFIGS = [
    { rows: 3, cols: 5, baseSpeed: 3.8, types: [1, 2] },
    { rows: 4, cols: 6, baseSpeed: 4.8, types: [1, 2, 3] },
    { rows: 5, cols: 6, baseSpeed: 6.2, types: [0, 1, 3, 4] }
  ];

  function resizeScreen() {
    const rect = bezel.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.resetTransform();
    ctx.scale(dpr, dpr);
    gameW = rect.width;
    gameH = rect.height;

    const perk = PILOT_PERKS[selectedPilotKey];
    paddle.w = Math.max(86, Math.min(125, gameW * 0.28 * perk.paddleScale));
    paddle.h = 22;
    paddle.y = gameH - 46;
    ball.r = 9;

    if (!isRunning) draw();
  }
  window.addEventListener("resize", () => {
    if (mount.style.display === "block") resizeScreen();
  });

  function buildBricks(stg) {
    bricks = [];
    const cfg = STAGE_CONFIGS[stg - 1];
    const padX = 6;
    const padY = 6;
    const marginX = 12;
    const totalSpacing = (cfg.cols - 1) * padX;
    const brickW = (gameW - marginX * 2 - totalSpacing) / cfg.cols;
    const brickH = 22;
    const offY = 56;

    for (let r = 0; r < cfg.rows; r++) {
      for (let c = 0; c < cfg.cols; c++) {
        const t = cfg.types[(r + c) % cfg.types.length];
        bricks.push({
          x: marginX + c * (brickW + padX),
          y: offY + r * (brickH + padY),
          w: brickW, h: brickH, type: t, alive: true
        });
      }
    }
    initialBrickCount = bricks.length;
    document.getElementById("stageIndicator").innerText = "MÀN " + stg + " / " + maxStage;
    updateHUD();
  }

  function updateHUD() {
    document.getElementById("uiScore").innerText = score;
    document.getElementById("uiCombo").innerText = "x" + combo;
    const tray = document.getElementById("uiHearts");
    tray.innerHTML = "";
    for (let i = 0; i < maxLives; i++) {
      const s = document.createElement("span");
      s.className = i < lives ? "heart-ico" : "heart-ico lost";
      s.innerText = "♥";
      tray.appendChild(s);
    }
  }

  function resetBallAndPaddle() {
    const cfg = STAGE_CONFIGS[currentStage - 1];
    const diffMult = selectedDiffIndex === 0 ? 0.85 : (selectedDiffIndex === 2 ? 1.25 : 1.0);
    const spd = cfg.baseSpeed * diffMult;

    paddle.x = (gameW - paddle.w) / 2;
    ball.x = gameW / 2;
    ball.y = paddle.y - ball.r - 2;
    ball.vx = (Math.random() > 0.5 ? 1 : -1) * (spd * 0.85);
    ball.vy = -spd;
    ball.inPlay = true;
    ballTrails = [];
  }

  function startStage(stg) {
    currentStage = stg;
    buildBricks(stg);
    resetBallAndPaddle();
    isRunning = true;

    document.getElementById("viewLobby").style.display = "none";
    document.getElementById("viewStageClear").style.display = "none";
    document.getElementById("viewGameOver").style.display = "none";
    document.getElementById("viewCertificate").style.display = "none";

    if (loopId) cancelAnimationFrame(loopId);
    engineLoop();
  }

  function addExplosionJuice(x, y, pts, curCombo) {
    const perk = PILOT_PERKS[selectedPilotKey];
    const count = 6 * perk.starMult;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: x, y: y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        life: 20
      });
    }
    popups.push({
      x: x, y: y,
      text: "+" + pts + (curCombo > 1 ? " x" + curCombo : ""),
      alpha: 1, vy: -1.2
    });
  }

  function updatePhysics() {
    if (!ball.inPlay) return;

    if (paddle.bounceY > 0) paddle.bounceY *= 0.82;

    ballTrails.unshift({ x: ball.x, y: ball.y });
    if (ballTrails.length > 5) ballTrails.pop();

    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.x - ball.r <= 0) { ball.x = ball.r; ball.vx *= -1; playBeep(320, "sine", 0.04); }
    if (ball.x + ball.r >= gameW) { ball.x = gameW - ball.r; ball.vx *= -1; playBeep(320, "sine", 0.04); }
    if (ball.y - ball.r <= 0) { ball.y = ball.r; ball.vy *= -1; playBeep(320, "sine", 0.04); }

    if (ball.y - ball.r > gameH) {
      lives--;
      playBeep(130, "sawtooth", 0.2);
      triggerHaptic(60);
      updateHUD();

      if (lives > 0) {
        resetBallAndPaddle();
      } else {
        gameOverFail();
        return;
      }
    }

    if (
      ball.y + ball.r >= paddle.y &&
      ball.y - ball.r <= paddle.y + paddle.h &&
      ball.x >= paddle.x &&
      ball.x <= paddle.x + paddle.w &&
      ball.vy > 0
    ) {
      ball.vy *= -1;
      paddle.bounceY = 6;
      const hitOffset = (ball.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2);
      const cfg = STAGE_CONFIGS[currentStage - 1];
      ball.vx = hitOffset * (cfg.baseSpeed * 1.35);
      combo = 1;
      playBeep(260, "sine", 0.06);
      triggerHaptic(20);
      updateHUD();
    }

    let hit = false;
    for (let b of bricks) {
      if (!b.alive) continue;
      if (
        ball.x + ball.r >= b.x &&
        ball.x - ball.r <= b.x + b.w &&
        ball.y + ball.r >= b.y &&
        ball.y - ball.r <= b.y + b.h
      ) {
        b.alive = false;
        ball.vy *= -1;
        const perk = PILOT_PERKS[selectedPilotKey];
        const bData = SPRITES.bricks[b.type];
        const gained = Math.round(bData.pts * combo * perk.comboBonus);
        score += gained;
        addExplosionJuice(b.x + b.w / 2, b.y + b.h / 2, gained, combo);
        combo = Math.min(combo + 1, 8);
        playBeep(560, "square", 0.05);
        triggerHaptic(25);
        hit = true;
        break;
      }
    }

    if (hit) {
      updateHUD();
      const left = bricks.filter(b => b.alive).length;
      if (left === 0) {
        stageClearedSuccess();
      }
    }

    particles.forEach(p => { p.x += p.vx; p.y += p.vy; p.life--; });
    particles = particles.filter(p => p.life > 0);

    popups.forEach(pop => { pop.y += pop.vy; pop.alpha -= 0.035; });
    popups = popups.filter(pop => pop.alpha > 0);
  }

  // 獨立圖片 Cover 模式渲染 (等比鋪滿畫布，防拉伸變形)
  function drawCoverImage(image, w, h) {
    if (!image || !image.complete || image.naturalWidth === 0) {
      ctx.fillStyle = "#a8d5e5";
      ctx.fillRect(0, 0, w, h);
      return;
    }
    const imgRatio = image.naturalWidth / image.naturalHeight;
    const canvasRatio = w / h;
    let sx = 0, sy = 0, sw = image.naturalWidth, sh = image.naturalHeight;

    if (imgRatio > canvasRatio) {
      sw = image.naturalHeight * canvasRatio;
      sx = (image.naturalWidth - sw) / 2;
    } else {
      sh = image.naturalWidth / canvasRatio;
      sy = (image.naturalHeight - sh) / 2;
    }
    ctx.drawImage(image, sx, sy, sw, sh, 0, 0, w, h);
  }

  function draw() {
    // 1. 繪製當前關卡的獨立背景圖
    const currentBgImg = STAGE_BG_IMAGES[currentStage - 1];
    drawCoverImage(currentBgImg, gameW, gameH);

    // 2. 綠色速度拖尾
    ballTrails.forEach((t, i) => {
      ctx.fillStyle = "rgba(46, 204, 113, " + (0.35 - i * 0.06) + ")";
      ctx.beginPath();
      ctx.arc(t.x, t.y, ball.r * (1 - i * 0.14), 0, Math.PI * 2);
      ctx.fill();
    });

    // 3. 磚塊
    for (let b of bricks) {
      if (!b.alive) continue;
      const s = SPRITES.bricks[b.type];
      if (atlasReady && atlas.naturalWidth > 0) {
        ctx.drawImage(atlas, s.x, s.y, s.w, s.h, b.x, b.y, b.w, b.h);
      } else {
        ctx.fillStyle = s.color;
        ctx.fillRect(b.x, b.y, b.w, b.h);
      }
    }

    // 4. 擋板
    const drawPadY = paddle.y + paddle.bounceY;
    if (atlasReady && atlas.naturalWidth > 0) {
      const pS = SPRITES.paddles[currentPaddleSkin];
      ctx.drawImage(atlas, pS.x, pS.y, pS.w, pS.h, paddle.x, drawPadY, paddle.w, paddle.h);
    } else {
      ctx.fillStyle = currentPaddleSkin === 'blue' ? "#3498db" : "#e74c3c";
      ctx.fillRect(paddle.x, drawPadY, paddle.w, paddle.h);
    }

    // 5. 56px 大尺寸 Q 版動物領航員
    const pilotImg = PILOT_IMAGES[selectedPilotKey];
    if (pilotImg && pilotImg.naturalWidth > 0) {
      const pilotSize = 56;
      const pilotX = paddle.x + (paddle.w - pilotSize) / 2;
      const pilotY = drawPadY - pilotSize + 10;

      ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
      ctx.shadowBlur = 6;
      ctx.drawImage(pilotImg, pilotX, pilotY, pilotSize, pilotSize);
      ctx.shadowBlur = 0;
    }

    // 6. 反彈球
    if (atlasReady && atlas.naturalWidth > 0) {
      const bS = SPRITES.balls[currentBallSkin];
      ctx.drawImage(atlas, bS.x, bS.y, bS.w, bS.h, ball.x - ball.r, ball.y - ball.r, ball.r * 2, ball.r * 2);
    } else {
      ctx.fillStyle = currentBallSkin === 'blue' ? "#f39c12" : "#95a5a6";
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 7. 粒子特效
    particles.forEach(p => {
      if (atlasReady && atlas.naturalWidth > 0) {
        const st = SPRITES.star;
        ctx.drawImage(atlas, st.x, st.y, st.w, st.h, p.x - 7, p.y - 7, 14, 14);
      } else {
        ctx.fillStyle = "#f39c12";
        ctx.fillRect(p.x, p.y, 4, 4);
      }
    });

    // 8. 浮動跳字
    popups.forEach(pop => {
      ctx.font = "bold 13px 'Chakra Petch', sans-serif";
      ctx.fillStyle = "rgba(214, 137, 16, " + pop.alpha + ")";
      ctx.shadowColor = "rgba(255, 255, 255, 0.9)";
      ctx.shadowBlur = 3;
      ctx.fillText(pop.text, pop.x, pop.y);
      ctx.shadowBlur = 0;
    });
  }

  function engineLoop() {
    if (!isRunning) return;
    updatePhysics();
    draw();
    loopId = requestAnimationFrame(engineLoop);
  }

  function stageClearedSuccess() {
    isRunning = false;
    cancelAnimationFrame(loopId);
    playBeep(880, "triangle", 0.35);

    if (currentStage < maxStage) {
      document.getElementById("stageClearHeading").innerText = "HOÀN THÀNH MÀN " + currentStage + "!";
      document.getElementById("viewStageClear").style.display = "flex";
    } else {
      document.getElementById("certHeroImg").src = "./animal-" + selectedPilotKey + ".png";
      document.getElementById("certScore").innerText = score;
      document.getElementById("certCombo").innerText = "x" + combo;
      document.getElementById("viewCertificate").style.display = "flex";

      if (window.fbq && ACTIVE_PIXEL_ID !== "000000000000000") {
        try { fbq('trackCustom', 'Arcade_Master_Achieved'); } catch(e){}
      }
    }
  }

  function gameOverFail() {
    isRunning = false;
    cancelAnimationFrame(loopId);

    const remaining = bricks.filter(b => b.alive).length;
    const clearedPercent = Math.round(((initialBrickCount - remaining) / initialBrickCount) * 100);

    document.getElementById("overNearMiss").innerText =
      "Tiếc quá! Bạn đã dọn sạch " + clearedPercent + "% khối gạch màn này!";
    document.getElementById("overFinalScore").innerText = score;
    document.getElementById("viewGameOver").style.display = "flex";
  }

  // 事件監聽綁定
  document.querySelectorAll(".pilot-card").forEach(card => {
    card.addEventListener("click", function() {
      const key = this.getAttribute("data-pilot");
      if (!key) return;
      selectedPilotKey = key;
      document.querySelectorAll(".pilot-card").forEach(c => c.classList.remove("active"));
      this.classList.add("active");
      const p = PILOT_PERKS[key];
      document.getElementById("perkHeroName").innerText = p.name;
      document.getElementById("perkHeroDesc").innerText = p.desc;
      playBeep(440, "sine", 0.05);
    });
  });

  document.querySelectorAll(".diff-btn-kenney").forEach(btn => {
    btn.addEventListener("click", function() {
      selectedDiffIndex = parseInt(this.getAttribute("data-diff"), 10);
      document.querySelectorAll(".diff-btn-kenney").forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      playBeep(520, "sine", 0.05);
    });
  });

  document.getElementById("btnLaunchGame").addEventListener("click", function() {
    initAudio();
    const perk = PILOT_PERKS[selectedPilotKey];
    maxLives = 3 + perk.extraLife;
    lives = maxLives;
    score = 0;
    combo = 1;
    currentStage = 1;

    resizeScreen();
    startStage(1);
  });

  document.getElementById("btnContinueNext").addEventListener("click", function() {
    currentStage++;
    startStage(currentStage);
  });

  document.getElementById("btnRetryStage").addEventListener("click", function() {
    lives = maxLives;
    startStage(currentStage);
  });

  document.getElementById("btnReplayAll").addEventListener("click", function() {
    isRunning = false;
    document.getElementById("viewCertificate").style.display = "none";
    document.getElementById("viewLobby").style.display = "flex";
    draw();
  });

  document.getElementById("btnSaveCert").addEventListener("click", function() {
    alert("Đã ghi nhận chứng nhận vinh danh S+! Bạn có thể chụp màn hình để lưu lại.");
  });

  document.getElementById("btnExitArena").addEventListener("click", function() {
    isRunning = false;
    if (loopId) cancelAnimationFrame(loopId);
    if (window.closeArcadeArena) window.closeArcadeArena();
  });

  document.getElementById("btnAudioToggle").addEventListener("click", function() {
    audioOn = !audioOn;
    document.getElementById("icoAudioOn").style.display = audioOn ? "block" : "none";
    document.getElementById("icoAudioOff").style.display = audioOn ? "none" : "block";
  });

  document.getElementById("btnSettingsOpen").addEventListener("click", function() {
    document.getElementById("drawerOverlay").style.display = "flex";
  });
  document.getElementById("drawerCloseBtn").addEventListener("click", function() {
    document.getElementById("drawerOverlay").style.display = "none";
  });

  document.getElementById("skinPadBlue").addEventListener("click", function() {
    currentPaddleSkin = 'blue';
    this.classList.add("active");
    document.getElementById("skinPadRed").classList.remove("active");
    draw();
  });
  document.getElementById("skinPadRed").addEventListener("click", function() {
    currentPaddleSkin = 'red';
    this.classList.add("active");
    document.getElementById("skinPadBlue").classList.remove("active");
    draw();
  });
  document.getElementById("skinBallBlue").addEventListener("click", function() {
    currentBallSkin = 'blue';
    this.classList.add("active");
    document.getElementById("skinBallGrey").classList.remove("active");
    draw();
  });
  document.getElementById("skinBallGrey").addEventListener("click", function() {
    currentBallSkin = 'grey';
    this.classList.add("active");
    document.getElementById("skinBallBlue").classList.remove("active");
    draw();
  });

  function onTouchMove(clientX) {
    const rect = bezel.getBoundingClientRect();
    const touchX = clientX - rect.left;
    paddle.x = Math.max(0, Math.min(gameW - paddle.w, touchX - paddle.w / 2));
  }
  window.addEventListener("mousemove", e => { if (isRunning) onTouchMove(e.clientX); });
  bezel.addEventListener("touchmove", e => {
    e.preventDefault();
    if (isRunning && e.touches.length > 0) onTouchMove(e.touches[0].clientX);
  }, { passive: false });

  window.initArcadeEngine = function() {
    resizeScreen();
    document.getElementById("viewLobby").style.display = "flex";
  };
})();
