import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaretDown, CalendarBlank, Paperclip, X } from "@phosphor-icons/react";

export default function CreateTransferPage() {
  const navigate = useNavigate();
  const datePickerRef = useRef(null);

  const [fromAccount, setFromAccount] = useState("1-10001");
  const [toAccount, setToAccount] = useState("1-10001");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [tag, setTag] = useState("");
  const [transactionNumber, setTransactionNumber] = useState("");
  const [date, setDate] = useState("2026-10-07");
  const [attachment, setAttachment] = useState(null);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [message, setMessage] = useState("");

  const accounts = [
    { code: "1-10001", name: "Kas (Cash & Bank)" },
    { code: "1-10002", name: "Rekening Bank" },
    { code: "1-10003", name: "Giro" },
  ];

  const formatAccount = (code) => {
    const account = accounts.find((item) => item.code === code);
    return account ? `${account.code} - ${account.name}` : "";
  };

  const parseAmount = (value) => {
    const normalized = value.trim().replace(/\s/g, "");

    if (normalized.includes(",")) {
      return Number(normalized.replace(/\./g, "").replace(",", "."));
    }

    return Number(normalized);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("");

    if (!fromAccount || !toAccount) {
      setMessage("Pilih akun asal dan akun tujuan.");
      return;
    }

    if (fromAccount === toAccount) {
      setMessage("Akun asal dan akun tujuan tidak boleh sama.");
      return;
    }

    if (
      !amount ||
      !Number.isFinite(parseAmount(amount)) ||
      parseAmount(amount) <= 0
    ) {
      setMessage("Masukkan jumlah transfer yang valid.");
      return;
    }

    setMessage(
      "Form transfer sudah diisi. Penyimpanan transaksi ke database belum dihubungkan.",
    );
  };

  const handleCancel = () => {
    navigate("/kas-bank");
  };

  return (
    <div className="-m-4 flex min-h-[calc(100vh-80px)] flex-col bg-[#f2f3f7] text-[#333] md:-m-6">
      <header className="flex h-[73px] shrink-0 flex-col justify-center border-b border-[#d4d9df] bg-white px-5">
        <span className="text-[11px] leading-4 text-[#555]">Transaksi</span>
        <h1 className="text-[19px] font-semibold leading-6 text-[#234d80]">
          Transfer Uang
        </h1>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
        <section className="grid shrink-0 grid-cols-1 gap-x-[22px] gap-y-3 bg-[#dff5fc] px-3 pb-[22px] pt-3 md:grid-cols-3">
          <div className="min-w-0">
            <label
              htmlFor="transfer-from"
              className="mb-1 block text-[11px] font-bold leading-[14px]"
            >
              Transfer Dari
            </label>

            <div className="relative flex h-[27px] overflow-hidden rounded-[3px] border border-[#c8cdd1] bg-white">
              <select
                id="transfer-from"
                value={fromAccount}
                onChange={(event) => setFromAccount(event.target.value)}
                className="h-full min-w-0 flex-1 appearance-none bg-transparent px-2 pr-[52px] text-[10px] outline-none"
              >
                {accounts.map((account) => (
                  <option key={account.code} value={account.code}>
                    {formatAccount(account.code)}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => setFromAccount("")}
                aria-label="Kosongkan akun asal"
                className="absolute right-[25px] top-0 flex h-full w-5 items-center justify-center bg-white text-[13px] text-[#888] hover:text-[#333]"
              >
                ×
              </button>

              <span className="pointer-events-none absolute right-0 top-0 flex h-full w-[24px] items-center justify-center border-l border-[#d2d6da] bg-[#fafafa] text-[#777]">
                <CaretDown size={11} />
              </span>
            </div>
          </div>

          <div className="min-w-0">
            <label
              htmlFor="transfer-to"
              className="mb-1 block text-[11px] font-bold leading-[14px]"
            >
              Setor Ke
            </label>

            <div className="relative flex h-[27px] overflow-hidden rounded-[3px] border border-[#c8cdd1] bg-white">
              <select
                id="transfer-to"
                value={toAccount}
                onChange={(event) => setToAccount(event.target.value)}
                className="h-full min-w-0 flex-1 appearance-none bg-transparent px-2 pr-[52px] text-[10px] outline-none"
              >
                {accounts.map((account) => (
                  <option key={account.code} value={account.code}>
                    {formatAccount(account.code)}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => setToAccount("")}
                aria-label="Kosongkan akun tujuan"
                className="absolute right-[25px] top-0 flex h-full w-5 items-center justify-center bg-white text-[13px] text-[#888] hover:text-[#333]"
              >
                ×
              </button>

              <span className="pointer-events-none absolute right-0 top-0 flex h-full w-[24px] items-center justify-center border-l border-[#d2d6da] bg-[#fafafa] text-[#777]">
                <CaretDown size={11} />
              </span>
            </div>
          </div>

          <div className="min-w-0">
            <label
              htmlFor="transfer-amount"
              className="mb-1 block text-[11px] font-bold leading-[14px]"
            >
              Jumlah
            </label>

            <div className="flex h-[27px] items-center rounded-[3px] border border-[#c8cdd1] bg-white px-2">
              <span className="mr-1 whitespace-nowrap text-[11px] text-[#555]">
                Rp.
              </span>
              <input
                id="transfer-amount"
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="0,00"
                className="h-full w-full min-w-0 bg-transparent text-[11px] outline-none"
              />
            </div>
          </div>
        </section>

        <section className="grid shrink-0 grid-cols-1 gap-x-[22px] gap-y-3 bg-white px-3 pb-5 pt-[10px] md:grid-cols-3">
          <div className="min-w-0">
            <label
              htmlFor="transfer-memo"
              className="mb-[5px] block text-[11px] font-bold leading-[15px]"
            >
              Memo
            </label>

            <textarea
              id="transfer-memo"
              value={memo}
              onChange={(event) => setMemo(event.target.value)}
              className="block h-[60px] w-full resize-y rounded-[3px] border border-[#c8cdd1] bg-white px-2 py-1.5 text-[11px] outline-none focus:border-[#8bb9d5]"
            />

            <div className="mt-[10px]">
              <label
                htmlFor="transfer-attachment"
                className="mb-[5px] flex items-center gap-0.5 text-[11px] font-bold leading-[15px]"
              >
                <Paperclip size={11} weight="bold" />
                Lampiran
              </label>

              <label className="flex h-[43px] w-full max-w-[338px] cursor-pointer flex-col items-center justify-center border border-dashed border-[#d5d9de] bg-white px-2 text-center hover:bg-[#fafcfd]">
                <span className="text-[10px] text-[#aaa]">
                  <span className="font-semibold">☁</span> Tarik file ke sini,
                  atau{" "}
                  <span className="text-[#51a9c6] underline">pilih file</span>
                </span>
                <span className="mt-0.5 text-[8px] text-[#bbb]">
                  Ukuran maksimal 10 MB
                </span>
                <input
                  id="transfer-attachment"
                  type="file"
                  className="hidden"
                  onChange={(event) =>
                    setAttachment(event.target.files?.[0] || null)
                  }
                />
              </label>

              {attachment && (
                <div className="mt-1 flex max-w-[338px] items-center justify-between gap-2 text-[10px] text-[#555]">
                  <span className="truncate">{attachment.name}</span>
                  <button
                    type="button"
                    onClick={() => setAttachment(null)}
                    aria-label="Hapus lampiran"
                    className="shrink-0 text-[#777] hover:text-red-500"
                  >
                    <X size={13} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="min-w-0">
            <label
              htmlFor="transfer-tag"
              className="mb-[5px] block text-[11px] font-bold leading-[15px]"
            >
              Tag
            </label>

            <input
              id="transfer-tag"
              type="text"
              value={tag}
              onChange={(event) => setTag(event.target.value)}
              className="h-[27px] w-full rounded-[3px] border border-[#c8cdd1] bg-white px-2 text-[11px] outline-none focus:border-[#8bb9d5]"
            />
          </div>

          <div className="min-w-0">
            <label
              htmlFor="transfer-number"
              className="mb-[5px] flex items-center gap-1 text-[11px] font-bold leading-[15px]"
            >
              No Transaksi
              <span className="text-[12px] font-semibold text-[#337ab7]">
                ⚙
              </span>
            </label>

            <input
              id="transfer-number"
              type="text"
              value={transactionNumber}
              onChange={(event) => setTransactionNumber(event.target.value)}
              placeholder="[Auto]"
              className="h-[27px] w-full rounded-[3px] border border-[#c8cdd1] bg-white px-2 text-[11px] outline-none placeholder:text-[#aaa] focus:border-[#8bb9d5]"
            />

            <label
              htmlFor="transfer-date"
              className="mb-[5px] mt-[11px] block text-[11px] font-bold leading-[15px]"
            >
              Tgl Transaksi
            </label>

            <div className="flex h-[27px] overflow-hidden rounded-[3px] border border-[#c8cdd1] bg-white">
              <button
                type="button"
                onClick={() => datePickerRef.current?.showPicker?.()}
                aria-label="Pilih tanggal transaksi"
                className="flex w-[31px] shrink-0 items-center justify-center border-r border-[#d2d6da] bg-[#f3f4f6] text-[#555] hover:bg-[#e9ecef]"
              >
                <CalendarBlank size={14} />
              </button>

              <input
                ref={datePickerRef}
                id="transfer-date"
                type="date"
                lang="id-ID"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="h-full min-w-0 flex-1 bg-white px-2 text-[11px] outline-none"
              />
            </div>
          </div>
        </section>

        {message && (
          <div
            role="status"
            className="border-t border-[#ddd] bg-white px-3 py-2 text-[11px] text-[#555]"
          >
            {message}
          </div>
        )}

        <footer className="flex min-h-[65px] flex-1 items-start justify-end gap-[3px] border-t border-[#e1e3e8] bg-[#f2f3f7] px-3 pt-[18px]">
          <button
            type="button"
            onClick={handleCancel}
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
              Buat Transferan
            </button>

            <button
              type="button"
              onClick={() => setShowCreateMenu((previous) => !previous)}
              aria-label="Pilihan pembuatan transfer"
              className="flex h-full w-[24px] items-center justify-center rounded-r-[2px] border border-l-0 border-[#4cae4c] bg-[#5cb85c] text-white hover:bg-[#4cae4c]"
            >
              <CaretDown size={11} weight="bold" />
            </button>

            {showCreateMenu && (
              <div className="absolute right-0 top-full z-20 mt-1 w-[155px] border border-[#ccc] bg-white py-1 shadow-md">
                <button
                  type="button"
                  onClick={() => setShowCreateMenu(false)}
                  className="block w-full px-3 py-2 text-left text-[11px] text-[#333] hover:bg-[#f5f5f5]"
                >
                  Buat Transferan
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
