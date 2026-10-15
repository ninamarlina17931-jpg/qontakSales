import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarBlank, CaretDown, Paperclip, X } from "@phosphor-icons/react";

export default function CreateSendMoneyPage() {
  const navigate = useNavigate();
  const dateInputRef = useRef(null);

  const [account, setAccount] = useState("1-10001");
  const [recipient, setRecipient] = useState("");
  const [date, setDate] = useState("2026-10-07");
  const [transactionNumber, setTransactionNumber] = useState("");
  const [tag, setTag] = useState("");
  const [memo, setMemo] = useState("");
  const [includeTax, setIncludeTax] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showDeduction, setShowDeduction] = useState(false);
  const [deduction, setDeduction] = useState("");
  const [paymentType, setPaymentType] = useState("akun");
  const [message, setMessage] = useState("");

  const [items, setItems] = useState([
    { id: 1, account: "", description: "", tax: "", amount: "" },
    { id: 2, account: "", description: "", tax: "", amount: "" },
  ]);

  const [nextId, setNextId] = useState(3);

  const accounts = [
    { code: "1-10001", name: "Kas (Cash & Bank)" },
    { code: "1-10002", name: "Rekening Bank" },
    { code: "1-10003", name: "Giro" },
  ];

  const parseAmount = (value) => {
    const normalized = String(value ?? "").trim();

    if (!normalized) return 0;

    if (normalized.includes(",")) {
      return Number(normalized.replace(/\./g, "").replace(",", ".")) || 0;
    }

    return Number(normalized) || 0;
  };

  const formatCurrency = (value) =>
    Number(value || 0).toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const formatDate = (value) => {
    if (!value) return "";

    const [year, month, day] = value.split("-");
    return `${day}/${month}/${year}`;
  };

  const openDatePicker = () => {
    const input = dateInputRef.current;

    if (!input) return;

    if (typeof input.showPicker === "function") {
      try {
        input.showPicker();
        return;
      } catch {
        input.focus();
      }
    } else {
      input.focus();
      input.click();
    }
  };

  const subtotal = items.reduce(
    (sum, item) => sum + Math.max(0, parseAmount(item.amount)),
    0,
  );

  const deductionAmount = Math.min(
    subtotal,
    Math.max(0, parseAmount(deduction)),
  );

  const total = Math.max(0, subtotal - deductionAmount);

  const updateItem = (id, field, value) => {
    setItems((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const addItem = () => {
    setItems((previous) => [
      ...previous,
      {
        id: nextId,
        account: "",
        description: "",
        tax: "",
        amount: "",
      },
    ]);

    setNextId((previous) => previous + 1);
  };

  const removeItem = (id) => {
    setItems((previous) => previous.filter((item) => item.id !== id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("");

    if (!account) {
      setMessage("Pilih akun pembayaran terlebih dahulu.");
      return;
    }

    if (items.length === 0 || items.some((item) => !item.account)) {
      setMessage("Pilih akun untuk setiap baris pembayaran.");
      return;
    }

    if (subtotal <= 0) {
      setMessage("Masukkan jumlah pembayaran yang valid.");
      return;
    }

    setMessage(
      "Form berhasil divalidasi. Penyimpanan transaksi ke database belum dihubungkan.",
    );
  };

  return (
    <div className="-m-4 flex min-h-[calc(100vh-80px)] flex-col bg-[#f1f2f6] text-[#333] md:-m-6">
      <header className="flex h-[73px] shrink-0 flex-col justify-center border-b border-[#d4d9df] bg-white px-5">
        <span className="text-[11px] leading-4 text-[#555]">Transaksi</span>

        <h1 className="text-[19px] font-semibold leading-6 text-[#234d80]">
          Kirim Uang
        </h1>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
        <section className="grid min-h-[81px] shrink-0 grid-cols-1 items-center gap-x-[22px] gap-y-3 bg-[#dff5fc] px-3 py-3 md:grid-cols-[308px_minmax(0,1fr)]">
          <div className="w-full">
            <label
              htmlFor="send-account"
              className="mb-1 block text-[11px] font-bold leading-[14px]"
            >
              Bayar Dari
            </label>

            <div className="flex h-[27px] overflow-hidden rounded-[3px] border border-[#c8cdd1] bg-white">
              <select
                id="send-account"
                value={account}
                onChange={(event) => setAccount(event.target.value)}
                className="h-full min-w-0 flex-1 bg-white px-2 text-[10px] outline-none"
              >
                <option value="">Pilih akun</option>

                {accounts.map((item) => (
                  <option key={item.code} value={item.code}>
                    ({item.code}) - {item.name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                aria-label="Kosongkan akun"
                onClick={() => setAccount("")}
                className="flex w-5 shrink-0 items-center justify-center bg-white text-[13px] text-[#888] hover:text-[#333]"
              >
                ×
              </button>

              <span className="flex w-6 shrink-0 items-center justify-center border-l border-[#d2d6da] bg-[#fafafa] text-[#777]">
                <CaretDown size={11} />
              </span>
            </div>
          </div>

          <div className="whitespace-nowrap text-right text-[17px] font-semibold text-[#333]">
            Total Amount{" "}
            <span className="text-[#337ab7]">Rp. {formatCurrency(total)}</span>
          </div>
        </section>

        <section className="grid shrink-0 grid-cols-1 gap-x-[22px] gap-y-3 bg-white px-3 pb-[48px] pt-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="min-w-0">
            <label
              htmlFor="send-recipient"
              className="mb-1 block text-[11px] font-bold leading-[15px]"
            >
              Penerima
            </label>

            <div className="flex h-[27px] overflow-hidden rounded-[3px] border border-[#c8cdd1] bg-white">
              <select
                id="send-recipient"
                value={recipient}
                onChange={(event) => setRecipient(event.target.value)}
                className="min-w-0 flex-1 appearance-none bg-transparent px-2 text-[10px] text-[#666] outline-none"
              >
                <option value="">Pilih kontak</option>
                <option value="pemasok">Pemasok</option>
                <option value="karyawan">Karyawan</option>
                <option value="lainnya">Kontak lainnya</option>
              </select>

              <span className="flex w-6 shrink-0 items-center justify-center border-l border-[#d2d6da] text-[#777]">
                <CaretDown size={11} />
              </span>
            </div>
          </div>

          <div className="min-w-0">
            <label
              htmlFor="send-date"
              className="mb-1 block text-[11px] font-bold leading-[15px]"
            >
              Tgl Transaksi
            </label>

            <div className="relative flex h-[27px] overflow-hidden rounded-[3px] border border-[#c8cdd1] bg-white">
              <button
                type="button"
                onClick={openDatePicker}
                aria-label="Buka kalender"
                className="relative z-10 flex w-8 shrink-0 items-center justify-center border-r border-[#d2d6da] bg-[#f3f4f6] text-[#555] hover:bg-[#e9ecef]"
              >
                <CalendarBlank size={14} />
              </button>

              <span className="flex min-w-0 flex-1 items-center bg-white px-2 text-[11px] text-[#555]">
                {formatDate(date)}
              </span>

              <input
                ref={dateInputRef}
                id="send-date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                aria-label="Pilih tanggal transaksi"
                className="pointer-events-none absolute left-8 top-0 h-px w-px opacity-0"
                tabIndex={-1}
              />
            </div>
          </div>

          <div className="min-w-0">
            <label
              htmlFor="send-number"
              className="mb-1 flex items-center gap-1 text-[11px] font-bold leading-[15px]"
            >
              No Transaksi
              <span className="text-[12px] text-[#337ab7]">⚙</span>
            </label>

            <input
              id="send-number"
              value={transactionNumber}
              onChange={(event) => setTransactionNumber(event.target.value)}
              placeholder="[Auto]"
              className="h-[27px] w-full rounded-[3px] border border-[#c8cdd1] bg-white px-2 text-[11px] outline-none placeholder:text-[#aaa]"
            />
          </div>

          <div className="min-w-0">
            <label
              htmlFor="send-tag"
              className="mb-1 block text-[11px] font-bold leading-[15px]"
            >
              Tag
            </label>

            <input
              id="send-tag"
              value={tag}
              onChange={(event) => setTag(event.target.value)}
              className="h-[27px] w-full rounded-[3px] border border-[#c8cdd1] bg-white px-2 text-[11px] outline-none"
            />
          </div>
        </section>

        <section className="flex flex-1 flex-col bg-white px-3 pb-5">
          <div className="flex min-h-[39px] items-center justify-end">
            <label className="flex cursor-pointer items-center gap-2 text-[10px] font-semibold">
              Harga termasuk pajak
              <input
                type="checkbox"
                checked={includeTax}
                onChange={(event) => setIncludeTax(event.target.checked)}
                className="sr-only"
              />
              <span
                className={`relative h-[15px] w-[25px] rounded-full ${
                  includeTax ? "bg-[#5cb85c]" : "bg-[#d0d0d0]"
                }`}
              >
                <span
                  className={`absolute top-[2px] h-[11px] w-[11px] rounded-full bg-white shadow-sm transition-all ${
                    includeTax ? "left-[12px]" : "left-[2px]"
                  }`}
                />
              </span>
            </label>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse">
              <thead>
                <tr className="h-[28px] border-y border-[#d5e8ee] bg-[#dff5fc]">
                  <th className="w-[19%] px-[10px] text-left text-[11px] font-bold">
                    <span>Pembayaran Untuk</span>{" "}
                    <button
                      type="button"
                      onClick={() => setPaymentType("akun")}
                      className={
                        paymentType === "akun"
                          ? "text-[#337ab7] underline"
                          : "font-normal text-[#777]"
                      }
                    >
                      Akun
                    </button>
                    <span className="px-1 text-[#999]">|</span>
                    <button
                      type="button"
                      onClick={() => setPaymentType("pengeluaran")}
                      className={
                        paymentType === "pengeluaran"
                          ? "font-normal text-[#337ab7]"
                          : "font-normal text-[#337ab7]"
                      }
                    >
                      Pengeluaran
                    </button>
                  </th>

                  <th className="w-[30%] px-[10px] text-left text-[11px] font-bold">
                    Deskripsi
                  </th>

                  <th className="w-[18%] px-[10px] text-left text-[11px] font-bold">
                    Pajak
                  </th>

                  <th className="w-[30%] px-[10px] text-left text-[11px] font-bold">
                    Jumlah
                  </th>

                  <th className="w-[3%]" />
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-[#e5e5e5]">
                    <td className="px-[10px] py-[5px]">
                      <div className="flex h-[27px] overflow-hidden rounded-[3px] border border-[#c8cdd1] bg-white">
                        <select
                          aria-label="Pembayaran untuk akun"
                          value={item.account}
                          onChange={(event) =>
                            updateItem(item.id, "account", event.target.value)
                          }
                          className="min-w-0 flex-1 appearance-none bg-white px-2 text-[10px] text-[#666] outline-none"
                        >
                          <option value="">
                            {paymentType === "akun"
                              ? "Pilih akun"
                              : "Pilih pengeluaran"}
                          </option>

                          {accounts.map((option) => (
                            <option key={option.code} value={option.code}>
                              {option.code} - {option.name}
                            </option>
                          ))}
                        </select>

                        <span className="flex w-5 shrink-0 items-center justify-center border-l border-[#d2d6da] text-[#777]">
                          <CaretDown size={10} />
                        </span>
                      </div>
                    </td>

                    <td className="px-[10px] py-[5px]">
                      <input
                        aria-label="Deskripsi pembayaran"
                        value={item.description}
                        onChange={(event) =>
                          updateItem(item.id, "description", event.target.value)
                        }
                        className="h-[27px] w-full rounded-[3px] border border-[#c8cdd1] bg-white px-2 text-[11px] outline-none"
                      />
                    </td>

                    <td className="px-[10px] py-[5px]">
                      <div className="flex h-[27px] overflow-hidden rounded-[3px] border border-[#c8cdd1] bg-white">
                        <select
                          aria-label="Pajak pembayaran"
                          value={item.tax}
                          onChange={(event) =>
                            updateItem(item.id, "tax", event.target.value)
                          }
                          className="min-w-0 flex-1 appearance-none bg-white px-2 text-[10px] text-[#666] outline-none"
                        >
                          <option value="">Pilih pajak</option>
                          <option value="ppn11">PPN 11%</option>
                          <option value="ppn12">PPN 12%</option>
                        </select>

                        <span className="flex w-5 shrink-0 items-center justify-center border-l border-[#d2d6da] text-[#777]">
                          <CaretDown size={10} />
                        </span>
                      </div>
                    </td>

                    <td className="px-[10px] py-[5px]">
                      <div className="flex h-[27px] items-center rounded-[3px] border border-[#c8cdd1] bg-white px-2">
                        <span className="mr-1 whitespace-nowrap text-[10px] text-[#666]">
                          Rp.
                        </span>

                        <input
                          aria-label="Jumlah pembayaran"
                          type="text"
                          inputMode="decimal"
                          value={item.amount}
                          onChange={(event) =>
                            updateItem(item.id, "amount", event.target.value)
                          }
                          placeholder="0,00"
                          className="min-w-0 flex-1 bg-transparent text-[11px] outline-none placeholder:text-[#777]"
                        />
                      </div>
                    </td>

                    <td className="px-1 py-[5px] text-center">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label="Hapus baris"
                        className="text-[17px] font-bold leading-none text-[#337ab7] hover:text-red-500"
                      >
                        −
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-[14px]">
            <button
              type="button"
              onClick={addItem}
              className="h-[30px] rounded-[2px] border border-[#216782] bg-[#287b95] px-[11px] text-[11px] text-white shadow-sm hover:bg-[#206a82]"
            >
              + Tambah Data
            </button>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <label
                htmlFor="send-memo"
                className="mb-1 block px-2 text-[11px] font-bold"
              >
                Memo
              </label>

              <textarea
                id="send-memo"
                value={memo}
                onChange={(event) => setMemo(event.target.value)}
                className="ml-2 block h-[60px] w-[calc(100%-16px)] max-w-[396px] resize-y rounded-[3px] border border-[#c8cdd1] bg-white px-2 py-1.5 text-[11px] outline-none"
              />

              <div className="ml-2 mt-[10px]">
                <label
                  htmlFor="send-attachment"
                  className="mb-1 flex items-center gap-1 text-[11px] font-bold"
                >
                  <Paperclip size={11} />
                  Lampiran
                </label>

                <label className="flex h-[43px] w-full max-w-[338px] cursor-pointer flex-col items-center justify-center border border-dashed border-[#d5d9de] bg-white px-2 text-center hover:bg-slate-50">
                  <span className="text-[10px] text-[#aaa]">
                    ☁ Tarik file ke sini, atau{" "}
                    <span className="text-[#51a9c6] underline">pilih file</span>
                  </span>

                  <span className="mt-0.5 text-[8px] text-[#bbb]">
                    Ukuran maksimal 10 MB
                  </span>

                  <input
                    id="send-attachment"
                    type="file"
                    className="hidden"
                    onChange={(event) =>
                      setAttachment(event.target.files?.[0] || null)
                    }
                  />
                </label>

                {attachment && (
                  <div className="mt-1 flex max-w-[338px] items-center justify-between gap-2 text-[10px] text-slate-600">
                    <span className="truncate">{attachment.name}</span>

                    <button
                      type="button"
                      onClick={() => setAttachment(null)}
                      aria-label="Hapus lampiran"
                    >
                      <X size={13} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="px-1">
              <div className="flex items-center justify-between py-1 text-[11px] text-[#555]">
                <span>SubTotal</span>
                <span>Rp. {formatCurrency(subtotal)}</span>
              </div>

              <div className="mt-7 flex items-center justify-between text-[11px] text-[#555]">
                <span>Total</span>
                <span>Rp. {formatCurrency(subtotal)}</span>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setShowDeduction((previous) => !previous)}
                  className="text-[11px] text-[#337ab7] hover:underline"
                >
                  ⊙ Masukan Jumlah Pemotongan
                </button>

                {showDeduction && (
                  <div className="flex h-[27px] w-[150px] items-center rounded-[3px] border border-[#c8cdd1] bg-white px-2">
                    <span className="mr-1 text-[10px] text-[#666]">Rp.</span>

                    <input
                      type="text"
                      inputMode="decimal"
                      value={deduction}
                      onChange={(event) => setDeduction(event.target.value)}
                      placeholder="0,00"
                      aria-label="Jumlah pemotongan"
                      className="min-w-0 flex-1 text-[11px] outline-none"
                    />
                  </div>
                )}
              </div>

              {deductionAmount > 0 && (
                <div className="mt-3 flex items-center justify-between text-[11px] text-[#555]">
                  <span>Pemotongan</span>
                  <span>- Rp. {formatCurrency(deductionAmount)}</span>
                </div>
              )}

              <div className="mt-5 flex items-center justify-between text-[14px] font-semibold text-[#444]">
                <span>Total</span>
                <span>Rp. {formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </section>

        {message && (
          <div
            role="status"
            className="border-t border-[#ddd] bg-white px-4 py-2 text-[11px] text-[#555]"
          >
            {message}
          </div>
        )}

        <footer className="flex min-h-[65px] shrink-0 items-center justify-end gap-1 border-t border-[#e1e3e8] bg-[#f1f2f6] px-3 py-3">
          <button
            type="button"
            onClick={() => navigate("/kas-bank")}
            className="flex h-[31px] items-center gap-1 rounded-[2px] border border-[#d43f32] bg-[#e74c3c] px-[11px] text-[11px] text-white shadow-sm hover:bg-[#d94334]"
          >
            <X size={12} weight="bold" />
            Batal
          </button>

          <div className="relative flex h-[31px]">
            <button
              type="submit"
              className="h-full rounded-l-[2px] border border-[#4cae4c] bg-[#5cb85c] px-[11px] text-[11px] text-white shadow-sm hover:bg-[#4cae4c]"
            >
              Buat Pengiriman
            </button>

            <button
              type="button"
              aria-label="Pilihan pembuatan pembayaran"
              aria-expanded={showCreateMenu}
              onClick={() => setShowCreateMenu((previous) => !previous)}
              className="flex h-full w-[24px] items-center justify-center rounded-r-[2px] border border-l-0 border-[#4cae4c] bg-[#5cb85c] text-white hover:bg-[#4cae4c]"
            >
              <CaretDown size={11} weight="bold" />
            </button>

            {showCreateMenu && (
              <div className="absolute bottom-full right-0 z-20 mb-1 w-[155px] border border-[#ccc] bg-white py-1 shadow-md">
                <button
                  type="button"
                  onClick={() => setShowCreateMenu(false)}
                  className="block w-full px-3 py-2 text-left text-[11px] text-[#333] hover:bg-[#f5f5f5]"
                >
                  Buat Pengiriman
                </button>

                <button
                  type="button"
                  onClick={() => setShowCreateMenu(false)}
                  className="block w-full px-3 py-2 text-left text-[11px] text-[#333] hover:bg-[#f5f5f5]"
                >
                  Buat dan baru
                </button>
              </div>
            )}
          </div>
        </footer>
      </form>
    </div>
  );
}
