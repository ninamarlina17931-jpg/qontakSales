import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bank,
  BookOpenText,
  CaretDown,
  CheckCircle,
  ArrowSquareOut,
  Info,
  Users,
} from "@phosphor-icons/react";

export default function CreateBankAccountPage() {
  const navigate = useNavigate();

  const [accountName, setAccountName] = useState("");
  const [accountCode, setAccountCode] = useState("1-10004");
  const [category, setCategory] = useState("Kas & Bank");
  const [isSubAccount, setIsSubAccount] = useState(false);
  const [parentAccount, setParentAccount] = useState("");
  const [bankName, setBankName] = useState("");
  const [tax, setTax] = useState("");
  const [description, setDescription] = useState("");
  const [access, setAccess] = useState("all");
  const [saving, setSaving] = useState(false);

  const handleSave = (event) => {
    event.preventDefault();

    if (!accountName.trim()) {
      alert("Nama akun wajib diisi.");
      return;
    }

    setSaving(true);

    alert(
      "Form akun berhasil diisi. Penyimpanan ke database belum dihubungkan.",
    );

    setSaving(false);
  };

  const handleCancel = () => {
    navigate("/kas-bank");
  };

  return (
    <div className="min-h-full bg-[#f0f3f9] text-[#303846]">
      <div className="flex min-h-[calc(100vh-145px)] flex-col">
        <div className="flex items-center justify-between px-[18px] py-[14px]">
          <div>
            <p className="text-[11px] text-[#526cb5]">Kas &amp; bank</p>

            <h1 className="mt-[3px] text-[21px] font-semibold leading-tight">
              Tambah akun baru
            </h1>
          </div>

          <button
            type="button"
            className="flex h-[34px] items-center gap-[7px] rounded-[5px] border border-[#d1d9e6] bg-white px-[12px] text-[11px] font-medium text-[#405cba] hover:bg-[#f8faff]"
          >
            <BookOpenText size={15} />
            Artikel panduan
          </button>
        </div>

        <form onSubmit={handleSave} className="flex flex-1 flex-col">
          <div className="grid flex-1 grid-cols-[minmax(0,1fr)_253px] items-start gap-[24px] border-y border-[#dce1e8] bg-white px-[18px] py-[18px] max-lg:grid-cols-1">
            <div className="min-w-0">
              <div className="mb-[25px] flex items-center gap-[10px]">
                <Bank size={19} className="text-[#4d6bd3]" />

                <h2 className="text-[16px] font-semibold">Informasi akun</h2>
              </div>

              <div className="grid max-w-[815px] grid-cols-2 gap-x-[18px] gap-y-[18px]">
                <div>
                  <div className="mb-[7px] flex items-center justify-between">
                    <label
                      htmlFor="accountName"
                      className="text-[11px] font-medium"
                    >
                      Nama akun <span className="text-red-500">*</span>
                    </label>

                    <span className="text-[9px] text-[#9aa2af]">
                      {accountName.length} / 255
                    </span>
                  </div>

                  <input
                    id="accountName"
                    required
                    maxLength={255}
                    value={accountName}
                    onChange={(event) => setAccountName(event.target.value)}
                    className="h-[30px] w-full rounded-[5px] border border-[#cbd3df] px-[9px] text-[11px] outline-none focus:border-[#5572d3]"
                  />
                </div>

                <div>
                  <div className="mb-[7px] flex items-center justify-between">
                    <label
                      htmlFor="accountCode"
                      className="text-[11px] font-medium"
                    >
                      Kode akun
                    </label>

                    <span className="text-[9px] text-[#9aa2af]">
                      {accountCode.length} / 255
                    </span>
                  </div>

                  <input
                    id="accountCode"
                    maxLength={255}
                    value={accountCode}
                    onChange={(event) => setAccountCode(event.target.value)}
                    className="h-[30px] w-full rounded-[5px] border border-[#cbd3df] px-[9px] text-[11px] outline-none focus:border-[#5572d3]"
                  />
                </div>

                <div className="col-span-2 max-w-[400px]">
                  <label
                    htmlFor="category"
                    className="mb-[7px] block text-[11px] font-medium"
                  >
                    Kategori akun
                  </label>

                  <div className="relative">
                    <select
                      id="category"
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                      className="h-[30px] w-full appearance-none rounded-[5px] border border-[#cbd3df] bg-white px-[9px] pr-[30px] text-[11px] outline-none focus:border-[#5572d3]"
                    >
                      <option>Kas &amp; Bank</option>
                      <option>Aset Lancar</option>
                      <option>Aset Tetap</option>
                      <option>Kewajiban</option>
                      <option>Ekuitas</option>
                      <option>Pendapatan</option>
                      <option>Beban</option>
                    </select>

                    <CaretDown
                      size={12}
                      className="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2 text-[#5e6878]"
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="flex w-fit cursor-pointer items-center gap-[7px] text-[11px]">
                    <input
                      type="checkbox"
                      checked={isSubAccount}
                      onChange={(event) =>
                        setIsSubAccount(event.target.checked)
                      }
                      className="h-[13px] w-[13px] accent-[#526bd1]"
                    />
                    Buat akun ini bagian dari akun lain
                    <span title="Akun ini akan menjadi subakun">
                      <Info size={14} className="text-[#7c8796]" />
                    </span>
                  </label>
                </div>

                {isSubAccount && (
                  <div className="col-span-2 max-w-[400px]">
                    <label
                      htmlFor="parentAccount"
                      className="mb-[7px] block text-[11px] font-medium"
                    >
                      Akun induk
                    </label>

                    <div className="relative">
                      <select
                        id="parentAccount"
                        value={parentAccount}
                        onChange={(event) =>
                          setParentAccount(event.target.value)
                        }
                        className="h-[30px] w-full appearance-none rounded-[5px] border border-[#cbd3df] bg-white px-[9px] pr-[30px] text-[11px] outline-none"
                      >
                        <option value="">Pilih akun induk</option>
                        <option value="Kas & Bank">Kas &amp; Bank</option>
                        <option value="Aset Lancar">Aset Lancar</option>
                      </select>

                      <CaretDown
                        size={12}
                        className="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2 text-[#5e6878]"
                      />
                    </div>
                  </div>
                )}

                <div className="col-span-2 max-w-[400px]">
                  <label
                    htmlFor="bankName"
                    className="mb-[7px] block text-[11px] font-medium"
                  >
                    Nama bank
                  </label>

                  <div className="relative">
                    <select
                      id="bankName"
                      value={bankName}
                      onChange={(event) => setBankName(event.target.value)}
                      className="h-[30px] w-full appearance-none rounded-[5px] border border-[#cbd3df] bg-white px-[9px] pr-[30px] text-[11px] outline-none focus:border-[#5572d3]"
                    >
                      <option value="">Pilih bank</option>
                      <option value="BCA">BCA</option>
                      <option value="Bank Mandiri">Bank Mandiri</option>
                      <option value="BNI">BNI</option>
                      <option value="BRI">BRI</option>
                      <option value="CIMB Niaga">CIMB Niaga</option>
                      <option value="Bank Lainnya">Bank lainnya</option>
                    </select>

                    <CaretDown
                      size={12}
                      className="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2 text-[#5e6878]"
                    />
                  </div>
                </div>

                <div className="col-span-2 max-w-[400px]">
                  <label
                    htmlFor="tax"
                    className="mb-[7px] block text-[11px] font-medium"
                  >
                    Pajak
                  </label>

                  <div className="relative">
                    <select
                      id="tax"
                      value={tax}
                      onChange={(event) => setTax(event.target.value)}
                      className="h-[30px] w-full appearance-none rounded-[5px] border border-[#cbd3df] bg-white px-[9px] pr-[30px] text-[11px] outline-none focus:border-[#5572d3]"
                    >
                      <option value="">Pilih pajak</option>
                      <option value="PPN 11%">PPN 11%</option>
                      <option value="PPN 12%">PPN 12%</option>
                      <option value="Tanpa pajak">Tanpa pajak</option>
                    </select>

                    <CaretDown
                      size={12}
                      className="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2 text-[#5e6878]"
                    />
                  </div>
                </div>

                <div className="col-span-2 max-w-[400px]">
                  <div className="mb-[7px] flex items-center justify-between">
                    <label
                      htmlFor="description"
                      className="text-[11px] font-medium"
                    >
                      Deskripsi
                    </label>

                    <span className="text-[9px] text-[#9aa2af]">
                      {description.length} / 255
                    </span>
                  </div>

                  <textarea
                    id="description"
                    maxLength={255}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Contoh: Akun untuk piutang karyawan"
                    className="h-[60px] w-full resize-y rounded-[5px] border border-[#cbd3df] px-[9px] py-[8px] text-[11px] outline-none placeholder:text-[#9ba4b1] focus:border-[#5572d3]"
                  />
                </div>
              </div>

              <div className="mb-[26px] mt-[48px] flex items-center gap-[10px]">
                <Users size={18} className="text-[#4d6bd3]" />

                <h2 className="text-[16px] font-semibold">Akses akun</h2>
              </div>

              <div>
                <p className="mb-[13px] text-[11px] font-medium">
                  Pengguna yang dapat mengakses
                </p>

                <div className="flex flex-wrap items-center gap-x-[25px] gap-y-[12px]">
                  <label className="flex cursor-pointer items-center gap-[7px] text-[11px]">
                    <input
                      type="radio"
                      name="accountAccess"
                      value="all"
                      checked={access === "all"}
                      onChange={(event) => setAccess(event.target.value)}
                      className="h-[13px] w-[13px] accent-[#526bd1]"
                    />
                    Semua pengguna
                  </label>

                  <label className="flex cursor-pointer items-center gap-[7px] text-[11px]">
                    <input
                      type="radio"
                      name="accountAccess"
                      value="some"
                      checked={access === "some"}
                      onChange={(event) => setAccess(event.target.value)}
                      className="h-[13px] w-[13px] accent-[#526bd1]"
                    />
                    Sebagian pengguna
                  </label>

                  <label className="flex cursor-pointer items-center gap-[7px] text-[11px]">
                    <input
                      type="radio"
                      name="accountAccess"
                      value="role"
                      checked={access === "role"}
                      onChange={(event) => setAccess(event.target.value)}
                      className="h-[13px] w-[13px] accent-[#526bd1]"
                    />
                    Peran tertentu
                  </label>
                </div>
              </div>
            </div>

            <aside className="rounded-[5px] border border-[#d0d6df] bg-white p-[18px]">
              <div className="flex h-[175px] items-center justify-center">
                <div className="relative flex h-[120px] w-[165px] items-center justify-center">
                  <div className="absolute left-[10px] top-[28px] h-[70px] w-[116px] rotate-[-7deg] rounded-[8px] border-[5px] border-[#d5e7f7] bg-[#f0f7ff]" />

                  <div className="relative h-[88px] w-[112px] rotate-[-8deg] rounded-[9px] border-[5px] border-[#454b55] bg-[#f6f7f9] p-[7px] shadow-md">
                    <div className="h-[10px] rounded-[3px] bg-[#d9dee5]" />
                    <div className="mt-[7px] h-[15px] rounded-[3px] border border-[#c5cbd3] bg-white" />
                    <div className="mt-[5px] h-[15px] rounded-[3px] border border-[#c5cbd3] bg-white" />

                    <div className="mt-[5px] flex gap-[4px]">
                      <div className="h-[10px] flex-1 rounded-[3px] bg-[#d9dee5]" />
                      <div className="h-[10px] flex-1 rounded-[3px] bg-[#d9dee5]" />
                    </div>
                  </div>

                  <div className="absolute right-[2px] top-[45px] flex h-[31px] w-[55px] rotate-[6deg] items-center justify-center rounded-[5px] border border-[#7eafe4] bg-[#7fc5f4] shadow-sm">
                    <div className="h-[5px] w-[29px] rounded-full bg-white/90" />
                  </div>

                  <CheckCircle
                    size={23}
                    weight="fill"
                    className="absolute right-[31px] top-[27px] text-[#40b978]"
                  />
                </div>
              </div>

              <h3 className="mt-[5px] text-[12px] font-semibold text-[#303846]">
                Cek mutasi dengan Cash Link
              </h3>

              <p className="mt-[9px] text-[11px] leading-[19px] text-[#505b6b]">
                Hubungkan rekening bank Anda untuk menerima mutasi bank dalam
                Jurnal secara otomatis.
              </p>

              <button
                type="button"
                className="mt-[12px] flex items-center gap-[6px] text-[11px] text-[#4968ce] hover:underline"
              >
                <ArrowSquareOut size={14} />
                Pelajari lebih lanjut
              </button>
            </aside>
          </div>

          <div className="flex items-center justify-end gap-[10px] border-x border-b border-[#dce1e8] bg-white px-[18px] py-[14px]">
            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="h-[30px] rounded-[5px] px-[14px] text-[11px] text-[#647084] hover:bg-[#f5f7fb]"
            >
              Batalkan
            </button>

            <button
              type="submit"
              disabled={saving}
              className="h-[30px] rounded-[5px] bg-[#526bd1] px-[16px] text-[11px] font-medium text-white hover:bg-[#4059bd] disabled:opacity-60"
            >
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
