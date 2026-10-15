import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CaretDown,
  CalendarBlank,
  Gear,
  Paperclip,
  Minus,
  Plus,
  SlidersHorizontal,
} from "@phosphor-icons/react";

const payFromOptions = [
  {
    value: "1-10001",
    label: "(1-10001) - Kas (Cash & Bank)",
  },
  {
    value: "1-10002",
    label: "(1-10002) - Rekening Bank (Cash & Bank)",
  },
];

const expenseAccounts = [
  "Beban Administrasi",
  "Beban Transportasi",
  "Beban Perlengkapan",
];

function formatRupiah(value) {
  return `Rp. ${Number(value || 0).toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function parseAmount(value) {
  const amount = Number(String(value || "").replace(/[^\d]/g, ""));
  return Number.isFinite(amount) ? amount : 0;
}

export default function CreateBiayaPage() {
  const navigate = useNavigate();

  const [payFrom, setPayFrom] = useState("1-10001");
  const [payLater, setPayLater] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [transactionDate, setTransactionDate] = useState("01/10/2026");
  const [paymentMethod, setPaymentMethod] = useState("Cek & Giro");
  const [expenseNumber, setExpenseNumber] = useState("[Auto]");
  const [tag, setTag] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [taxIncluded, setTaxIncluded] = useState(false);
  const [memo, setMemo] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [showDiscount, setShowDiscount] = useState(false);
  const [discount, setDiscount] = useState("");
  const [notice, setNotice] = useState("");

  const [rows, setRows] = useState([
    { id: 1, account: "", description: "", tax: "", amount: "" },
    { id: 2, account: "", description: "", tax: "", amount: "" },
  ]);

  const subtotal = rows.reduce((sum, row) => sum + parseAmount(row.amount), 0);

  const total = Math.max(subtotal - parseAmount(discount), 0);

  const updateRow = (id, field, value) => {
    setRows((currentRows) =>
      currentRows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row,
      ),
    );
  };

  const addRow = () => {
    const nextId = Math.max(0, ...rows.map((row) => row.id)) + 1;

    setRows((currentRows) => [
      ...currentRows,
      {
        id: nextId,
        account: "",
        description: "",
        tax: "",
        amount: "",
      },
    ]);
  };

  const removeRow = (id) => {
    setRows((currentRows) => currentRows.filter((row) => row.id !== id));
  };

  const handleSave = (event) => {
    event.preventDefault();

    setNotice(
      "Formulir sudah siap. Penyimpanan transaksi ke database belum dihubungkan.",
    );
  };

  return (
    <div className="min-h-full bg-[#f1f4f8] text-[#3f4854]">
      <div className="w-full border border-[#e0e4e8] bg-white">
        <header className="flex h-[55px] items-center justify-between border-b border-[#e0e4e8] px-4">
          <h1 className="text-[16px] font-semibold text-[#303846]">
            Buat Biaya
          </h1>

          <button
            type="button"
            className="flex h-[25px] items-center gap-1 rounded-[3px] border border-[#dce1e7] bg-white px-2 text-[9px] text-[#5f6875] hover:bg-slate-50"
          >
            <SlidersHorizontal size={11} />
            Lihat panduan
          </button>
        </header>

        <form onSubmit={handleSave}>
          <section className="grid min-h-[67px] grid-cols-1 items-center gap-3 bg-[#dff5fc] px-[10px] py-3 sm:grid-cols-[minmax(260px,345px)_auto_1fr] sm:px-4">
            <div>
              <label className="mb-[5px] block text-[10px] font-semibold">
                Bayar Dari
              </label>

              <div className="relative">
                <select
                  value={payFrom}
                  onChange={(event) => setPayFrom(event.target.value)}
                  className="h-[23px] w-full appearance-none rounded-[2px] border border-[#cbd4dd] bg-white px-[7px] pr-7 text-[9px] outline-none focus:border-blue-400"
                >
                  {payFromOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <CaretDown
                  size={9}
                  className="pointer-events-none absolute right-[5px] top-1/2 -translate-y-1/2"
                />
              </div>
            </div>

            <label className="flex items-center gap-[5px] text-[10px] sm:pt-[15px]">
              <input
                type="checkbox"
                checked={payLater}
                onChange={(event) => setPayLater(event.target.checked)}
                className="h-[12px] w-[12px] accent-blue-600"
              />
              Bayar Nanti
            </label>

            <div className="text-right sm:justify-self-end">
              <span className="text-[14px] font-semibold text-[#343d48]">
                Total{" "}
              </span>

              <span className="text-[14px] font-semibold text-[#3786ad]">
                {formatRupiah(total)}
              </span>
            </div>
          </section>

          <section className="px-[10px] pb-4 pt-[10px] sm:px-4">
            <div className="grid grid-cols-1 gap-x-4 gap-y-[10px] sm:grid-cols-[minmax(190px,1.55fr)_minmax(120px,1fr)_minmax(150px,1fr)_minmax(150px,1fr)_minmax(150px,1fr)]">
              <div>
                <label className="mb-[5px] block text-[10px] font-semibold">
                  Penerima
                </label>

                <div className="relative">
                  <select
                    value={recipient}
                    onChange={(event) => setRecipient(event.target.value)}
                    className="h-[23px] w-full appearance-none rounded-[2px] border border-[#cbd4dd] bg-white px-[7px] pr-6 text-[9px] outline-none"
                  >
                    <option value="">Pilih kontak</option>
                    <option value="PT Maju Jaya">PT Maju Jaya</option>
                    <option value="CV Sinar Abadi">CV Sinar Abadi</option>
                  </select>

                  <CaretDown
                    size={9}
                    className="pointer-events-none absolute right-[5px] top-1/2 -translate-y-1/2"
                  />
                </div>

                <div className="mt-[9px]">
                  <label className="mb-[5px] block text-[10px] font-semibold">
                    Alamat Penagihan
                  </label>

                  <textarea
                    value={billingAddress}
                    onChange={(event) => setBillingAddress(event.target.value)}
                    className="h-[50px] w-full resize-y rounded-[2px] border border-[#cbd4dd] bg-white px-[7px] py-1.5 text-[10px] outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-[5px] block text-[10px] font-semibold">
                  Tgl Transaksi
                </label>

                <div className="relative">
                  <input
                    type="text"
                    value={transactionDate}
                    onChange={(event) => setTransactionDate(event.target.value)}
                    className="h-[23px] w-full rounded-[2px] border border-[#cbd4dd] bg-white px-[7px] pr-6 text-[9px] outline-none"
                  />

                  <CalendarBlank
                    size={11}
                    className="absolute right-[5px] top-1/2 -translate-y-1/2 text-[#7b8691]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-[5px] block text-[10px] font-semibold">
                  Cara Pembayaran
                </label>

                <div className="relative">
                  <select
                    value={paymentMethod}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                    className="h-[23px] w-full appearance-none rounded-[2px] border border-[#cbd4dd] bg-white px-[7px] pr-6 text-[9px] outline-none"
                  >
                    <option value="Cek & Giro">Cek & Giro</option>
                    <option value="Transfer Bank">Transfer Bank</option>
                  </select>

                  <CaretDown
                    size={9}
                    className="pointer-events-none absolute right-[5px] top-1/2 -translate-y-1/2"
                  />
                </div>
              </div>

              <div>
                <label className="mb-[5px] flex items-center gap-1 text-[10px] font-semibold">
                  No Biaya
                  <Gear size={10} className="text-[#7f8995]" />
                </label>

                <input
                  type="text"
                  value={expenseNumber}
                  onChange={(event) => setExpenseNumber(event.target.value)}
                  className="h-[23px] w-full rounded-[2px] border border-[#cbd4dd] bg-white px-[7px] text-[9px] outline-none"
                />
              </div>

              <div>
                <label className="mb-[5px] block text-[10px] font-semibold">
                  Tag
                </label>

                <input
                  type="text"
                  value={tag}
                  onChange={(event) => setTag(event.target.value)}
                  className="h-[23px] w-full rounded-[2px] border border-[#cbd4dd] bg-white px-[7px] text-[9px] outline-none"
                />
              </div>
            </div>

            <div className="mt-[48px]">
              <div className="mb-[7px] flex items-center justify-end gap-[6px]">
                <span className="text-[9px] font-semibold">
                  Harga termasuk pajak
                </span>

                <button
                  type="button"
                  role="switch"
                  aria-checked={taxIncluded}
                  onClick={() => setTaxIncluded((value) => !value)}
                  className={`relative h-[14px] w-[27px] rounded-full ${
                    taxIncluded ? "bg-blue-500" : "bg-[#c7ccd1]"
                  }`}
                >
                  <span
                    className={`absolute top-[2px] h-[10px] w-[10px] rounded-full bg-white shadow ${
                      taxIncluded ? "left-[15px]" : "left-[2px]"
                    }`}
                  />
                </button>
              </div>

              <div className="overflow-x-auto">
                <div className="min-w-[900px]">
                  <div className="grid grid-cols-[minmax(175px,0.72fr)_minmax(280px,1.58fr)_minmax(210px,1fr)_minmax(260px,1.5fr)_24px] border-y border-[#d7e0e6] bg-[#dff5fc]">
                    <div className="px-[8px] py-[6px] text-[9px] font-semibold">
                      Akun Biaya
                    </div>

                    <div className="px-[8px] py-[6px] text-[9px] font-semibold">
                      Deskripsi
                    </div>

                    <div className="px-[8px] py-[6px] text-[9px] font-semibold">
                      Pajak
                    </div>

                    <div className="px-[8px] py-[6px] text-[9px] font-semibold">
                      Jumlah
                    </div>

                    <div />
                  </div>

                  {rows.map((row) => (
                    <div
                      key={row.id}
                      className="grid grid-cols-[minmax(175px,0.72fr)_minmax(280px,1.58fr)_minmax(210px,1fr)_minmax(260px,1.5fr)_24px] items-center border-b border-[#e3e7eb]"
                    >
                      <div className="px-[8px] py-[4px]">
                        <div className="relative">
                          <select
                            value={row.account}
                            onChange={(event) =>
                              updateRow(row.id, "account", event.target.value)
                            }
                            className="h-[22px] w-full appearance-none rounded-[2px] border border-[#cbd4dd] bg-white px-[6px] pr-5 text-[9px] outline-none"
                          >
                            <option value="">Pilih akun biaya</option>

                            {expenseAccounts.map((account) => (
                              <option key={account} value={account}>
                                {account}
                              </option>
                            ))}
                          </select>

                          <CaretDown
                            size={8}
                            className="pointer-events-none absolute right-[4px] top-1/2 -translate-y-1/2"
                          />
                        </div>
                      </div>

                      <div className="px-[8px] py-[4px]">
                        <input
                          type="text"
                          value={row.description}
                          onChange={(event) =>
                            updateRow(row.id, "description", event.target.value)
                          }
                          className="h-[22px] w-full rounded-[2px] border border-[#cbd4dd] px-[6px] text-[9px] outline-none focus:border-blue-400"
                        />
                      </div>

                      <div className="px-[8px] py-[4px]">
                        <div className="relative">
                          <select
                            value={row.tax}
                            onChange={(event) =>
                              updateRow(row.id, "tax", event.target.value)
                            }
                            className="h-[22px] w-full appearance-none rounded-[2px] border border-[#cbd4dd] bg-white px-[6px] pr-5 text-[9px] outline-none"
                          >
                            <option value="">Pilih pajak</option>
                            <option value="PPN 11%">PPN 11%</option>
                          </select>

                          <CaretDown
                            size={8}
                            className="pointer-events-none absolute right-[4px] top-1/2 -translate-y-1/2"
                          />
                        </div>
                      </div>

                      <div className="px-[8px] py-[4px]">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={row.amount}
                          onChange={(event) =>
                            updateRow(
                              row.id,
                              "amount",
                              event.target.value.replace(/[^\d]/g, ""),
                            )
                          }
                          placeholder="Rp. 0,00"
                          className="h-[22px] w-full rounded-[2px] border border-[#cbd4dd] px-[6px] text-[9px] outline-none placeholder:text-[#69737e] focus:border-blue-400"
                        />
                      </div>

                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={() => removeRow(row.id)}
                          aria-label="Hapus baris biaya"
                          className="text-[#3286ab] hover:text-red-500"
                        >
                          <Minus size={12} weight="bold" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={addRow}
                className="mt-[14px] flex h-[26px] items-center gap-1 rounded-[2px] bg-[#267b91] px-[9px] text-[9px] font-semibold text-white hover:bg-[#1f697c]"
              >
                <Plus size={11} weight="bold" />
                Tambah Data
              </button>
            </div>

            <div className="mt-[25px] grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <label className="mb-[5px] block text-[10px] font-semibold">
                  Memo
                </label>

                <textarea
                  value={memo}
                  onChange={(event) => setMemo(event.target.value)}
                  className="h-[50px] w-full max-w-[448px] resize-y rounded-[2px] border border-[#cbd4dd] bg-white px-2 py-1.5 text-[10px] outline-none focus:border-blue-400"
                />

                <div className="mt-[10px]">
                  <label className="mb-[5px] flex items-center gap-1 text-[10px] font-semibold">
                    <Paperclip size={11} />
                    Lampiran
                  </label>

                  <label className="flex h-[35px] w-full max-w-[280px] cursor-pointer items-center justify-center gap-1 rounded-[2px] border border-dashed border-[#d5dce2] bg-white px-3 text-center text-[9px] text-[#7e8994] hover:bg-slate-50">
                    {attachment
                      ? attachment.name
                      : "Tarik file ke sini, atau pilih file"}

                    <input
                      type="file"
                      className="hidden"
                      onChange={(event) =>
                        setAttachment(event.target.files?.[0] || null)
                      }
                    />
                  </label>

                  <p className="mt-1 text-[8px] text-[#89939e]">
                    Ukuran maksimal 10 MB per file.
                  </p>
                </div>
              </div>

              <div>
                <div className="ml-auto w-full max-w-[460px] text-[9px]">
                  <div className="flex h-[40px] items-center justify-between">
                    <span>SubTotal</span>
                    <span>{formatRupiah(subtotal)}</span>
                  </div>

                  <div className="flex h-[40px] items-center justify-between">
                    <span>Total</span>
                    <span>{formatRupiah(subtotal)}</span>
                  </div>

                  <div className="grid min-h-[42px] grid-cols-[1fr_1fr] items-center">
                    <button
                      type="button"
                      onClick={() => setShowDiscount((value) => !value)}
                      className="justify-self-end whitespace-nowrap pr-5 text-[9px] font-medium text-[#2681b1] hover:underline"
                    >
                      Masukan Jumlah Pemotongan
                    </button>

                    <div className="flex items-center justify-between text-[13px] font-semibold">
                      <span>Total</span>
                      <span>{formatRupiah(total)}</span>
                    </div>
                  </div>

                  {showDiscount && (
                    <div className="mt-2">
                      <label className="mb-1 block text-[9px]">
                        Jumlah Pemotongan
                      </label>

                      <input
                        type="text"
                        inputMode="numeric"
                        value={discount}
                        onChange={(event) =>
                          setDiscount(event.target.value.replace(/[^\d]/g, ""))
                        }
                        placeholder="Rp. 0,00"
                        className="h-[25px] w-full rounded-[2px] border border-[#cbd4dd] px-2 text-[9px] outline-none"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {notice && (
              <p className="mt-4 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-[10px] text-amber-800">
                {notice}
              </p>
            )}

            <footer className="mt-[40px] flex items-center justify-end gap-[3px] border-t border-[#eef0f2] pb-[13px] pt-4">
              <button
                type="button"
                onClick={() => navigate("/biaya")}
                className="h-[25px] rounded-[2px] bg-[#e4584f] px-[9px] text-[9px] font-semibold text-white hover:bg-[#ca4841]"
              >
                × Batal
              </button>

              <button
                type="submit"
                className="flex h-[25px] items-center gap-2 rounded-l-[2px] bg-[#54b65c] px-[10px] text-[9px] font-semibold text-white hover:bg-[#43a64b]"
              >
                Buat Biaya Baru
              </button>

              <button
                type="button"
                aria-label="Pilihan buat biaya"
                onClick={() =>
                  setNotice(
                    "Penyimpanan transaksi belum dihubungkan ke backend.",
                  )
                }
                className="flex h-[25px] items-center rounded-r-[2px] border-l border-white/30 bg-[#54b65c] px-[5px] text-white hover:bg-[#43a64b]"
              >
                <CaretDown size={10} weight="bold" />
              </button>
            </footer>
          </section>
        </form>
      </div>
    </div>
  );
}
