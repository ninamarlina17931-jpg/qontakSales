import { useState } from "react";

const steps = [
  {
    number: "1.",
    title: "Pilih periode",
    description:
      "Pilih periode yang akan Anda kunci atau tutup, lalu konfirmasi.",
    icon: "calendar",
  },
  {
    number: "2.",
    title: "Cek rekonsiliasi",
    description:
      "Periksa dan rekonsiliasi transaksi untuk memastikan semua data sesuai dan akurat.",
    icon: "check",
  },
  {
    number: "3.",
    title: "Periksa kertas kerja",
    description:
      "Gunakan kertas kerja untuk memastikan semua detail entri sudah benar.",
    icon: "calculator",
  },
  {
    number: "4.",
    title: "Tinjau laporan keuangan",
    description:
      "Tinjau laporan keuangan yang telah dibuat di periode tersebut, seperti trial balance, laba rugi, neraca, dan arus kas.",
    icon: "chart",
  },
];

function StepIcon({ type }) {
  const paths = {
    calendar: (
      <>
        <rect x="4" y="5" width="16" height="16" rx="3" />
        <path d="M8 3v4M16 3v4M4 9h16M8 12h2M8 15h2M13 12h3" />
      </>
    ),
    check: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6M9 12h6M9 16l2 2 4-5" />
      </>
    ),
    calculator: (
      <>
        <rect x="4" y="2" width="16" height="20" rx="4" />
        <path d="M8 6h8v4H8zM8 14h2M14 14h2M8 18h2M14 18h2" />
      </>
    ),
    chart: (
      <>
        <path d="M4 20h17M7 17v-5h3v5M13 17V7h3v10M19 17V3h2v14" />
        <path d="m5 8 5-4 4 2 6-4M16 2h4v4" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[type]}
    </svg>
  );
}

function ChevronDown({ open }) {
  return (
    <svg
      className={`closing-chevron ${open ? "is-open" : ""}`}
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="m5.5 7.5 4.5 4.5 4.5-4.5" />
    </svg>
  );
}

export default function ClosingPeriodPage() {
  const [showFeedbackMenu, setShowFeedbackMenu] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");

  return (
    <div className="closing-page">
      <style>{`
        .closing-page {
          min-height: 100%;
          background: #fff;
          color: #263445;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 12px;
        }

        .closing-page * {
          box-sizing: border-box;
        }

        .closing-page button,
        .closing-page textarea {
          font-family: inherit;
        }

        .closing-page-header {
          min-height: 54px;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          border-bottom: 1px solid #dce1e8;
          background: #f2f5f9;
          position: relative;
          z-index: 5;
        }

        .closing-page-heading {
          min-width: 0;
        }

        .closing-breadcrumb {
          color: #536ce5;
          font-size: 10px;
          margin-bottom: 4px;
        }

        .closing-page-heading h1 {
          margin: 0;
          font-size: 16px;
          line-height: 1.4;
          font-weight: 600;
          color: #283342;
        }

        .closing-header-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 6px;
        }

        .closing-feedback-wrapper,
        .closing-create-wrapper {
          position: relative;
        }

        .closing-feedback-button,
        .closing-create-button {
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 10px;
          border: 1px solid #d0d7e2;
          border-radius: 5px;
          background: #fff;
          color: #4059d9;
          font-size: 11px;
          line-height: 1;
          white-space: nowrap;
          cursor: pointer;
          transition: background .18s ease, border-color .18s ease;
        }

        .closing-feedback-button:hover {
          background: #f7f8ff;
          border-color: #b8c3f8;
        }

        .closing-button-divider {
          align-self: stretch;
          width: 1px;
          margin: 0 2px;
          background: #d7dce5;
        }

        .closing-chevron {
          display: block;
          width: 14px;
          height: 14px;
          flex: 0 0 14px;
          margin: 0;
          padding: 0;
          position: relative;
          top: 0;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: transform .2s ease;
        }

        .closing-chevron.is-open {
          transform: rotate(180deg);
        }

        .closing-create-button {
          min-width: 100px;
          justify-content: space-between;
          padding: 0 11px;
          color: #fff;
          background: #4e60e8;
          border-color: #4e60e8;
        }

        .closing-create-button:hover {
          background: #4052d5;
          border-color: #4052d5;
        }

        .closing-feedback-menu,
        .closing-create-menu {
          position: absolute;
          top: calc(100% + 6px);
          right: 0;
          z-index: 20;
          width: 220px;
          padding: 7px;
          border: 1px solid #e0e5ee;
          border-radius: 8px;
          background: #fff;
          box-shadow: 0 8px 24px rgb(20 35 60 / 12%);
          animation: closing-dropdown-in .16s ease-out;
        }

        @keyframes closing-dropdown-in {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .closing-menu-heading {
          padding: 8px 9px;
          color: #7a8597;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.3px;
        }

        .closing-feedback-menu button,
        .closing-create-menu button {
          display: block;
          width: 100%;
          padding: 10px;
          border: 0;
          border-radius: 5px;
          background: #fff;
          color: #344054;
          text-align: left;
          font-size: 11px;
          cursor: pointer;
          transition: background .15s ease;
        }

        .closing-feedback-menu button:hover,
        .closing-create-menu button:hover {
          background: #f1f4ff;
          color: #4059d9;
        }

        .closing-main {
          max-width: 1500px;
          margin: 0 auto;
          padding: 42px 5% 24px;
        }

        .closing-intro {
          display: grid;
          grid-template-columns: minmax(0, 1.7fr) minmax(240px, 0.8fr);
          align-items: center;
          gap: 30px;
          min-height: 210px;
        }

        .closing-intro-content h2 {
          margin: 0 0 14px;
          color: #18283b;
          font-size: 20px;
          line-height: 1.4;
          font-weight: 600;
        }

        .closing-intro-content p {
          margin: 0 0 12px;
          color: #40516a;
          font-size: 11px;
          line-height: 1.8;
        }

        .closing-intro-content h3 {
          margin: 14px 0 10px;
          color: #233247;
          font-size: 11px;
          font-weight: 600;
        }

        .closing-intro-content ul {
          margin: 0 0 15px;
          padding-left: 16px;
          color: #40516a;
          font-size: 11px;
          line-height: 1.9;
        }

        .closing-start-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
        }

        .closing-start-button {
          min-height: 29px;
          padding: 0 11px;
          border: 1px solid #cbd4e0;
          border-radius: 3px;
          background: #fff;
          color: #425bd7;
          font-size: 10px;
          cursor: pointer;
        }

        .closing-start-button:hover {
          background: #f5f7ff;
        }

        .closing-illustration {
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: 0;
        }

        .closing-illustration img {
          display: block;
          width: 100%;
          max-width: 300px;
          max-height: 235px;
          object-fit: contain;
        }

        .closing-steps-section {
          margin-top: 42px;
        }

        .closing-steps-section > h2 {
          margin: 0 0 30px;
          color: #1d2c40;
          text-align: center;
          font-size: 12px;
          font-weight: 600;
        }

        .closing-steps-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 28px;
        }

        .closing-step {
          min-width: 0;
        }

        .closing-step-icon {
          width: 23px;
          height: 23px;
          margin-bottom: 10px;
          color: #4f61e9;
        }

        .closing-step-icon svg {
          display: block;
          width: 21px;
          height: 21px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .closing-step h3 {
          margin: 0 0 9px;
          color: #172a43;
          font-size: 11px;
          font-weight: 600;
          line-height: 1.5;
        }

        .closing-step p {
          margin: 0;
          color: #56677f;
          font-size: 10px;
          line-height: 1.8;
        }

        .closing-footer {
          margin-top: 24px;
          padding: 16px 0 5px;
          border-top: 1px solid #dce2ea;
          text-align: center;
        }

        .closing-footer button {
          padding: 4px;
          border: 0;
          background: transparent;
          color: #4e63df;
          font-size: 10px;
          cursor: pointer;
        }

        .closing-footer button:hover {
          text-decoration: underline;
        }

        .closing-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgb(20 31 48 / 40%);
        }

        .closing-feedback-modal {
          position: relative;
          width: 100%;
          max-width: 440px;
          padding: 24px;
          border-radius: 8px;
          background: #fff;
          box-shadow: 0 10px 35px rgb(0 0 0 / 18%);
        }

        .closing-feedback-modal h2 {
          margin: 0 0 10px;
          color: #233247;
          font-size: 18px;
        }

        .closing-feedback-modal p {
          color: #5b6678;
          font-size: 12px;
          line-height: 1.7;
        }

        .closing-feedback-modal textarea {
          display: block;
          width: 100%;
          min-height: 110px;
          margin-top: 14px;
          padding: 10px;
          resize: vertical;
          border: 1px solid #ccd3df;
          border-radius: 4px;
          font-size: 12px;
        }

        .closing-modal-close {
          position: absolute;
          top: 10px;
          right: 14px;
          border: 0;
          background: transparent;
          color: #687386;
          font-size: 24px;
          cursor: pointer;
        }

        .closing-modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          margin-top: 16px;
        }

        .closing-modal-actions button {
          padding: 8px 14px;
          border-radius: 4px;
          font-size: 12px;
          cursor: pointer;
        }

        .closing-modal-cancel {
          border: 1px solid #cbd3df;
          background: #fff;
          color: #39465a;
        }

        .closing-modal-submit {
          border: 1px solid #4e60e8;
          background: #4e60e8;
          color: #fff;
        }

        @media (min-width: 1500px) {
          .closing-main {
            padding-right: 6%;
            padding-left: 6%;
          }

          .closing-intro {
            min-height: 240px;
          }

          .closing-illustration img {
            max-width: 330px;
            max-height: 250px;
          }
        }

        @media (max-width: 900px) {
          .closing-main {
            padding: 30px 24px 22px;
          }

          .closing-intro {
            grid-template-columns: minmax(0, 1.5fr) minmax(180px, 0.8fr);
            gap: 18px;
          }

          .closing-steps-grid {
            gap: 18px;
          }
        }

        @media (max-width: 650px) {
          .closing-page-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .closing-header-actions {
            align-self: flex-end;
          }

          .closing-main {
            padding: 24px 18px;
          }

          .closing-intro {
            grid-template-columns: 1fr;
          }

          .closing-illustration {
            grid-row: 1;
          }

          .closing-illustration img {
            max-width: 240px;
            max-height: 180px;
          }

          .closing-intro-content h2 {
            font-size: 18px;
          }

          .closing-steps-section {
            margin-top: 34px;
          }

          .closing-steps-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 25px 18px;
          }
        }

        @media (max-width: 380px) {
          .closing-steps-grid {
            grid-template-columns: 1fr;
          }

          .closing-feedback-button,
          .closing-create-button {
            padding-right: 8px;
            padding-left: 8px;
            gap: 6px;
          }
        }
      `}</style>

      <header className="closing-page-header">
        <div className="closing-page-heading">
          <div className="closing-breadcrumb">Daftar Akun</div>
          <h1>Daftar kunci periode &amp; tutup buku</h1>
        </div>

        <div className="closing-header-actions">
          <div className="closing-feedback-wrapper">
            <button
              type="button"
              className="closing-feedback-button"
              aria-expanded={showFeedbackMenu}
              onClick={() => {
                setShowFeedbackMenu((value) => !value);
                setShowCreateMenu(false);
              }}
            >
              <span>Beri masukan</span>
              <span className="closing-button-divider" />
              <ChevronDown open={showFeedbackMenu} />
            </button>

            {showFeedbackMenu && (
              <div className="closing-feedback-menu">
                <div className="closing-menu-heading">ARTIKEL PANDUAN</div>

                <button
                  type="button"
                  onClick={() => setShowFeedbackMenu(false)}
                >
                  Kunci periode
                </button>

                <button
                  type="button"
                  onClick={() => setShowFeedbackMenu(false)}
                >
                  Tutup buku
                </button>
              </div>
            )}
          </div>

          <div className="closing-create-wrapper">
            <button
              type="button"
              className="closing-create-button"
              aria-expanded={showCreateMenu}
              onClick={() => {
                setShowCreateMenu((value) => !value);
                setShowFeedbackMenu(false);
              }}
            >
              <span>Buat baru</span>
              <ChevronDown open={showCreateMenu} />
            </button>

            {showCreateMenu && (
              <div className="closing-create-menu">
                <button type="button" onClick={() => setShowCreateMenu(false)}>
                  Kunci periode
                </button>

                <button type="button" onClick={() => setShowCreateMenu(false)}>
                  Tutup buku
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="closing-main">
        <section className="closing-intro">
          <div className="closing-intro-content">
            <h2>Fitur kunci periode dan tutup buku</h2>

            <p>
              Kunci periode memastikan transaksi yang berada dalam periode yang
              sudah dikunci tidak berubah.
            </p>

            <p>
              Tutup buku meliputi penguncian periode dan peralihan keuntungan
              bersih/rugi periode sebelumnya menjadi modal awal periode
              berikutnya melalui jurnal penutup.
            </p>

            <h3>Waktu untuk melakukan</h3>

            <ul>
              <li>
                Kunci periode dapat dilakukan saat transaksi dalam laporan sudah
                ditinjau dan tidak ingin diubah.
              </li>
              <li>
                Tutup buku umumnya dilakukan pada akhir tahun, akhir periode
                akuntansi, atau keduanya.
              </li>
            </ul>

            <div className="closing-start-actions">
              <button type="button" className="closing-start-button">
                Mulai kunci periode
              </button>

              <button type="button" className="closing-start-button">
                Mulai tutup buku
              </button>
            </div>
          </div>

          <div className="closing-illustration">
            <img src="Calm-Blue-Office-Productivity-Scene.png" />
          </div>
        </section>

        <section className="closing-steps-section">
          <h2>Langkah-langkah kunci periode dan tutup buku</h2>

          <div className="closing-steps-grid">
            {steps.map((step) => (
              <article className="closing-step" key={step.number}>
                <div className="closing-step-icon">
                  <StepIcon type={step.icon} />
                </div>

                <h3>
                  {step.number} {step.title}
                </h3>

                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <footer className="closing-footer">
          <button type="button" onClick={() => setShowFeedback(true)}>
            Pelajari lebih lanjut tentang kunci periode dan tutup buku
          </button>
        </footer>
      </main>

      {showFeedback && (
        <div
          className="closing-modal-overlay"
          onClick={() => setShowFeedback(false)}
        >
          <div
            className="closing-feedback-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="closing-modal-close"
              onClick={() => setShowFeedback(false)}
              aria-label="Tutup"
            >
              ×
            </button>

            <h2>Beri masukan</h2>

            <p>
              Sampaikan masukan Anda mengenai halaman kunci periode dan tutup
              buku.
            </p>

            <textarea
              value={feedbackText}
              onChange={(event) => setFeedbackText(event.target.value)}
              placeholder="Tulis masukan Anda di sini..."
              rows={5}
            />

            <div className="closing-modal-actions">
              <button
                type="button"
                className="closing-modal-cancel"
                onClick={() => setShowFeedback(false)}
              >
                Batal
              </button>

              <button
                type="button"
                className="closing-modal-submit"
                onClick={() => setShowFeedback(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
