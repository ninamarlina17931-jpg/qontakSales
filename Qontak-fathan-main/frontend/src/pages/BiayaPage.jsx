import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlass, CaretDown, X, Plus } from "@phosphor-icons/react";

function ImportBiayaModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4">
      <div className="relative w-full max-w-[620px] overflow-hidden rounded-md bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-[13px] text-slate-400 hover:text-slate-600"
        >
          ×
        </button>

        <div className="border-b border-slate-200 px-6 py-5">
          <p className="text-[10px] text-slate-500">Impor</p>
          <h2 className="mt-1 text-[18px] font-semibold text-slate-800">
            Biaya
          </h2>
        </div>

        <div className="px-6 py-6">
          <div className="flex gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-[12px] font-semibold text-sky-600 ring-1 ring-sky-300">
              1
            </div>

            <div className="flex flex-1 items-start justify-between gap-5">
              <div>
                <p className="text-[13px] font-semibold text-slate-700">
                  Download template
                </p>
                <p className="mt-1 max-w-[320px] text-[9px] leading-4 text-slate-500">
                  Gunakan template yang sudah disediakan untuk memasukkan data
                  biaya ke dalam sistem.
                </p>
              </div>

              <button
                type="button"
                className="shrink-0 rounded-sm bg-sky-600 px-4 py-2 text-[8px] font-semibold text-white hover:bg-sky-700"
              >
                Download template
              </button>
            </div>
          </div>

          <div className="my-6 border-t border-slate-200" />

          <div className="flex gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-[12px] font-semibold text-sky-600 ring-1 ring-sky-300">
              2
            </div>

            <div className="flex flex-1 items-start justify-between gap-5">
              <div>
                <p className="text-[13px] font-semibold text-slate-700">
                  Masukkan data biaya
                </p>
                <p className="mt-1 max-w-[390px] text-[9px] leading-4 text-slate-500">
                  Isi data biaya pada template yang sudah Anda download,
                  kemudian simpan kembali file tersebut.
                </p>
              </div>

              <button
                type="button"
                className="mt-1 text-slate-500 hover:text-slate-700"
              >
                <CaretDown size={14} />
              </button>
            </div>
          </div>

          <div className="my-6 border-t border-slate-200" />

          <div className="flex gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-[12px] font-semibold text-sky-600 ring-1 ring-sky-300">
              3
            </div>

            <div className="flex flex-1 items-start justify-between gap-5">
              <div>
                <p className="text-[13px] font-semibold text-slate-700">
                  Upload file
                </p>
                <p className="mt-1 max-w-[320px] text-[9px] leading-4 text-slate-500">
                  Pilih file template yang sudah Anda isi untuk melanjutkan
                  proses impor biaya.
                </p>
                <p className="mt-2 text-[9px] text-slate-400">
                  Belum ada file yang dipilih
                </p>
              </div>

              <button
                type="button"
                className="shrink-0 rounded-sm border border-sky-600 bg-white px-4 py-2 text-[8px] font-semibold text-sky-600 hover:bg-sky-50"
              >
                Pilih file
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-sm border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-[9px] font-semibold text-slate-700">
              Ketentuan impor transaksi
            </p>
            <p className="mt-1 text-[8px] leading-4 text-slate-600">
              Sebelum mengimpor, pastikan data pada file sudah sesuai dengan
              format template yang disediakan.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="h-8 rounded-sm border border-slate-300 bg-white px-5 text-[9px] font-medium text-slate-600 hover:bg-slate-100"
          >
            Batal
          </button>

          <button
            type="button"
            disabled
            className="h-8 cursor-not-allowed rounded-sm bg-slate-300 px-6 text-[9px] font-semibold text-white"
          >
            Impor
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BiayaPage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Biaya");
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [importOpen, setImportOpen] = useState(false);

  const tabs = ["Biaya", "Membutuhkan Persetujuan"];

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const getListTitle = () => {
    if (activeFilter === "month") {
      return "Expenses This Month";
    }

    if (activeFilter === "30days") {
      return "Expenses Last 30 Days";
    }

    if (activeFilter === "unpaid") {
      return "Unpaid Expenses";
    }

    return "";
  };

  const listTitle = getListTitle();

  const handleCreateBiaya = () => {
    navigate("/biaya/create");
  };

  return (
    <div className="min-h-full bg-slate-100 p-4 md:p-5">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] text-slate-600">Biaya</p>
            <h1 className="text-[20px] font-semibold text-blue-700">
              Pengeluaran
            </h1>
          </div>

          <button
            type="button"
            onClick={handleCreateBiaya}
            className="flex h-9 items-center gap-1 rounded-sm bg-sky-700 px-4 text-[11px] font-semibold text-white hover:bg-sky-800"
          >
            <Plus size={14} weight="bold" />
            Buat Biaya Baru
          </button>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <button
            type="button"
            onClick={() => handleFilterClick("month")}
            className={`overflow-hidden rounded-sm bg-white text-left transition ${
              activeFilter === "month"
                ? "ring-2 ring-sky-500"
                : "hover:ring-1 hover:ring-sky-300"
            }`}
          >
            <div className="flex h-9 items-center justify-between bg-sky-100 px-3">
              <span className="text-[11px] font-semibold text-slate-700">
                Total Biaya Bulan Ini (dalam IDR)
              </span>
              <span className="flex h-4 min-w-4 items-center justify-center rounded-sm bg-sky-600 px-1 text-[9px] font-semibold text-white">
                0
              </span>
            </div>

            <div className="px-3 py-3">
              <p className="text-[8px] text-slate-500">Total</p>
              <p className="text-[15px] font-medium text-slate-800">Rp. 0,00</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleFilterClick("30days")}
            className={`overflow-hidden rounded-sm bg-white text-left transition ${
              activeFilter === "30days"
                ? "ring-2 ring-sky-500"
                : "hover:ring-1 hover:ring-sky-300"
            }`}
          >
            <div className="flex h-9 items-center justify-between bg-sky-100 px-3">
              <span className="text-[11px] font-semibold text-slate-700">
                Biaya 30 Hari Terakhir (dalam IDR)
              </span>
              <span className="flex h-4 min-w-4 items-center justify-center rounded-sm bg-sky-600 px-1 text-[9px] font-semibold text-white">
                0
              </span>
            </div>

            <div className="px-3 py-3">
              <p className="text-[8px] text-slate-500">Total</p>
              <p className="text-[15px] font-medium text-slate-800">Rp. 0,00</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleFilterClick("unpaid")}
            className={`overflow-hidden rounded-sm bg-white text-left transition ${
              activeFilter === "unpaid"
                ? "ring-2 ring-sky-500"
                : "hover:ring-1 hover:ring-sky-300"
            }`}
          >
            <div className="flex h-9 items-center justify-between bg-sky-100 px-3">
              <span className="text-[11px] font-semibold text-slate-700">
                Biaya Belum Dibayar (dalam IDR)
              </span>
              <span className="flex h-4 min-w-4 items-center justify-center rounded-sm bg-sky-600 px-1 text-[9px] font-semibold text-white">
                0
              </span>
            </div>

            <div className="px-3 py-3">
              <p className="text-[8px] text-slate-500">Total</p>
              <p className="text-[15px] font-medium text-slate-800">Rp. 0,00</p>
            </div>
          </button>
        </div>

        <p className="mb-2 text-right text-[9px] text-slate-500">
          Saldo adalah untuk semua jangka waktu, kecuali ada pernyataan lain
        </p>

        <div className="rounded-sm border border-slate-300 bg-white">
          <div className="flex items-center justify-between px-4 py-4">
            <h2 className="text-[18px] font-semibold text-slate-800">
              Daftar Biaya
              {listTitle && (
                <>
                  <span className="mx-2 text-slate-500">&gt;&gt;</span>
                  <span className="text-slate-800">{listTitle}</span>
                </>
              )}
            </h2>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setImportOpen(true)}
                className="flex h-8 items-center border border-slate-300 bg-white px-3 text-[10px] text-slate-600 hover:bg-slate-50"
              >
                Impor
              </button>

              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Pencarian..."
                  className="h-8 w-[165px] border border-slate-300 bg-white px-3 pr-8 text-[10px] outline-none focus:border-blue-500"
                />

                <button
                  type="button"
                  className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center text-slate-500"
                  aria-label="Cari biaya"
                >
                  <MagnifyingGlass size={14} />
                </button>

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400"
                    aria-label="Hapus pencarian"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="border-b border-slate-300 px-4">
            <div className="flex items-end">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative border-b-2 px-3 py-3 text-[10px] ${
                    activeTab === tab
                      ? "border-blue-600 font-medium text-blue-600"
                      : "border-transparent text-slate-600 hover:text-blue-600"
                  }`}
                >
                  {tab}

                  {tab === "Membutuhkan Persetujuan" && (
                    <span className="ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded-sm bg-orange-400 px-1 text-[8px] font-semibold text-white">
                      0
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "Biaya" ? (
            <div className="px-4 pt-7">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse">
                  <thead>
                    <tr className="bg-sky-100">
                      <th className="px-3 py-2 text-left text-[9px] font-semibold text-sky-700">
                        Tanggal
                      </th>
                      <th className="px-3 py-2 text-left text-[9px] font-semibold text-sky-700">
                        Nomor
                      </th>
                      <th className="px-3 py-2 text-left text-[9px] font-semibold text-sky-700">
                        Kategori
                      </th>
                      <th className="px-3 py-2 text-left text-[9px] font-semibold text-sky-700">
                        Penerima
                      </th>
                      <th className="px-3 py-2 text-left text-[9px] font-semibold text-sky-700">
                        Status
                      </th>
                      <th className="px-3 py-2 text-right text-[9px] font-semibold text-sky-700">
                        Sisa Tagihan{" "}
                        <span className="font-bold text-slate-500">
                          (dalam IDR)
                        </span>
                      </th>
                      <th className="px-3 py-2 text-right text-[9px] font-semibold text-sky-700">
                        Total{" "}
                        <span className="font-bold text-slate-500">
                          (dalam IDR)
                        </span>
                      </th>
                      <th className="px-3 py-2 text-left text-[9px] font-semibold text-sky-700">
                        Tags
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td
                        colSpan="8"
                        className="h-[220px] text-center align-middle"
                      >
                        <p className="text-[10px] text-slate-500">
                          Anda belum memiliki transaksi.
                        </p>

                        <button
                          type="button"
                          onClick={handleCreateBiaya}
                          className="mt-4 bg-sky-700 px-3 py-2 text-[10px] font-semibold text-white hover:bg-sky-800"
                        >
                          + Buat Biaya Baru
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-3 flex h-12 items-center bg-sky-100 px-3">
                <p className="text-[9px] text-slate-600">
                  Menampilkan 0 ... 0 dari 0 Baris
                </p>
              </div>
            </div>
          ) : (
            <div className="px-4 pt-7">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] border-collapse">
                  <thead>
                    <tr className="bg-sky-100">
                      <th className="px-3 py-2 text-left text-[9px] font-semibold text-sky-700">
                        Tanggal
                      </th>
                      <th className="px-3 py-2 text-left text-[9px] font-semibold text-sky-700">
                        Nomor
                      </th>
                      <th className="px-3 py-2 text-left text-[9px] font-semibold text-sky-700">
                        Kategori
                      </th>
                      <th className="px-3 py-2 text-left text-[9px] font-semibold text-sky-700">
                        Penerima
                      </th>
                      <th className="px-3 py-2 text-left text-[9px] font-semibold text-sky-700">
                        Status
                      </th>
                      <th className="px-3 py-2 text-right text-[9px] font-semibold text-sky-700">
                        Sisa Tagihan{" "}
                        <span className="font-bold text-slate-500">
                          (dalam IDR)
                        </span>
                      </th>
                      <th className="px-3 py-2 text-right text-[9px] font-semibold text-sky-700">
                        Total{" "}
                        <span className="font-bold text-slate-500">
                          (dalam IDR)
                        </span>
                      </th>
                      <th className="px-3 py-2 text-left text-[9px] font-semibold text-sky-700">
                        Tags
                      </th>
                      <th className="px-6 py-2 text-left text-[9px] font-semibold text-slate-500">
                        Tindakan
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td
                        colSpan="9"
                        className="h-[220px] text-center align-middle"
                      >
                        <p className="text-[10px] text-slate-500">
                          Anda belum memiliki transaksi.
                        </p>

                        <button
                          type="button"
                          onClick={handleCreateBiaya}
                          className="mt-4 bg-sky-700 px-3 py-2 text-[10px] font-semibold text-white hover:bg-sky-800"
                        >
                          + Buat Biaya Baru
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-3 flex h-12 items-center bg-sky-100 px-3">
                <p className="text-[9px] text-slate-600">
                  Menampilkan 0 ... 0 dari 0 Baris
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {importOpen && <ImportBiayaModal onClose={() => setImportOpen(false)} />}
    </div>
  );
}
