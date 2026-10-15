import { useEffect, useState } from "react";
import { CaretDown, Gear } from "@phosphor-icons/react";
import api from "../services/api";

export default function CreateSalesInvoicePage() {
  const [customers, setCustomers] = useState([]);
  const [loadingCustomers, setLoadingCustomers] = useState(true);
  const [saving, setSaving] = useState(false);
  const [customer, setCustomer] = useState("");
  const [email, setEmail] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [transactionDate, setTransactionDate] = useState("2026-09-30");
  const [dueDate, setDueDate] = useState("2026-10-30");
  const [transactionNo, setTransactionNo] = useState("[Auto]");
  const [customerReferenceNo, setCustomerReferenceNo] = useState("");
  const [term, setTerm] = useState("Net 30");
  const [warehouse, setWarehouse] = useState("");
  const [tag, setTag] = useState("");
  const [priceIncludesTax, setPriceIncludesTax] = useState(false);
  const [message, setMessage] = useState("");
  const [memo, setMemo] = useState("");
  const [discountType, setDiscountType] = useState("%");
  const [discount, setDiscount] = useState("");
  const [withholding, setWithholding] = useState(false);
  const [files, setFiles] = useState([]);

  const [items, setItems] = useState([
    {
      product: "",
      description: "",
      qty: 1,
      units: "",
      unitPrice: 0,
      discount: 0,
      tax: 0,
    },
  ]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoadingCustomers(true);

      const response = await api.get("/customers/");

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];

      setCustomers(data);
    } catch (error) {
      console.error("Gagal mengambil customer:", error);
      setCustomers([]);
    } finally {
      setLoadingCustomers(false);
    }
  };

  const handleCustomerChange = (event) => {
    const selectedId = event.target.value;

    setCustomer(selectedId);

    const selectedCustomer = customers.find(
      (item) => String(item.id) === String(selectedId),
    );

    if (selectedCustomer) {
      setEmail(selectedCustomer.email || "");
      setBillingAddress(selectedCustomer.address || "");
    } else {
      setEmail("");
      setBillingAddress("");
    }
  };

  const updateItem = (index, field, value) => {
    setItems((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  const lineSubtotal = (item) => {
    return Number(item.qty || 0) * Number(item.unitPrice || 0);
  };

  const lineDiscount = (item) => {
    return lineSubtotal(item) * (Number(item.discount || 0) / 100);
  };

  const lineAmount = (item) => {
    return lineSubtotal(item) - lineDiscount(item);
  };

  const lineTax = (item) => {
    return lineAmount(item) * (Number(item.tax || 0) / 100);
  };

  const subtotal = items.reduce((sum, item) => sum + lineSubtotal(item), 0);

  const discountPerLines = items.reduce(
    (sum, item) => sum + lineDiscount(item),
    0,
  );

  const tax = items.reduce((sum, item) => sum + lineTax(item), 0);

  const additionalDiscount =
    discountType === "%"
      ? subtotal * (Number(discount || 0) / 100)
      : Number(discount || 0);

  const total = Math.max(
    0,
    subtotal - discountPerLines - additionalDiscount + tax,
  );

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(value || 0));
  };

  const formatDateForApi = (value) => {
    if (!value) {
      return "";
    }

    if (value.includes("-")) {
      return value;
    }

    const parts = value.split("/");

    if (parts.length !== 3) {
      return value;
    }

    const [day, month, year] = parts;

    return `${year}-${month}-${day}`;
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    setFiles(selectedFiles.slice(0, 5));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (saving) {
      return;
    }

    if (!customer) {
      alert("Customer wajib dipilih.");
      return;
    }

    const hasInvalidItem = items.some(
      (item) =>
        !item.product ||
        Number(item.qty || 0) <= 0 ||
        Number(item.unitPrice || 0) < 0,
    );

    if (hasInvalidItem) {
      alert("Produk, Qty, dan Unit price harus diisi dengan benar.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        transaction_no: transactionNo === "[Auto]" ? "" : transactionNo,
        customer: Number(customer),
        email: email.trim(),
        billing_address: billingAddress.trim(),
        transaction_date: formatDateForApi(transactionDate),
        due_date: formatDateForApi(dueDate),
        customer_reference_no: customerReferenceNo.trim(),
        term,
        warehouse: warehouse.trim(),
        tag: tag.trim(),
        price_includes_tax: priceIncludesTax,
        message: message.trim(),
        memo: memo.trim(),
        discount_type: discountType,
        discount: Number(discount || 0),
        withholding,
        subtotal,
        discount_per_lines: discountPerLines,
        tax,
        total,
        items: items.map((item) => ({
          product: item.product,
          description: item.description,
          qty: Number(item.qty || 0),
          units: item.units,
          unit_price: Number(item.unitPrice || 0),
          discount: Number(item.discount || 0),
          tax: Number(item.tax || 0),
          amount: lineAmount(item) + lineTax(item),
        })),
      };

      console.log("Invoice payload:", payload);

      await api.post("/sales/invoices/", payload);

      alert("Sales Invoice berhasil dibuat.");

      window.location.href = "/penjualan";
    } catch (error) {
      console.error("Gagal menyimpan invoice:", error);
      console.error("Response:", error.response?.data);

      const responseData = error.response?.data;

      let messageText = "Transaksi gagal disimpan.";

      if (responseData?.detail) {
        messageText = responseData.detail;
      } else if (responseData && typeof responseData === "object") {
        const firstError = Object.values(responseData)[0];

        if (Array.isArray(firstError)) {
          messageText = firstError[0];
        } else if (typeof firstError === "string") {
          messageText = firstError;
        }
      }

      alert(String(messageText));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-full bg-[#f3f6fa] text-[#30343b]">
      <div className="w-full px-[14px] pt-[14px] pb-[18px]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] leading-none text-[#5875c9]">Sales</p>

            <h1 className="mt-[5px] text-[19px] font-semibold leading-none text-[#252a31]">
              Create Sales Invoice
            </h1>
          </div>

          <div className="relative">
            <select
              defaultValue="Sales Invoice"
              className="h-[28px] w-[140px] appearance-none rounded-[4px] border border-[#cfd6de] bg-white px-[9px] pr-[27px] text-[9px] text-[#343a40] outline-none"
            >
              <option value="Sales Invoice">Sales Invoice</option>
            </select>

            <CaretDown
              size={11}
              className="pointer-events-none absolute right-[8px] top-1/2 -translate-y-1/2 text-[#626a73]"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mt-[12px] border border-[#d4dbe2] bg-white">
            <div className="border-b border-dashed border-[#e2e6ea] px-[15px] py-[15px]">
              <div className="grid grid-cols-[380px_380px_1fr] gap-[15px]">
                <div>
                  <label className="mb-[6px] block text-[9px] font-semibold text-[#30343a]">
                    Customer <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <select
                      value={customer}
                      onChange={handleCustomerChange}
                      disabled={loadingCustomers}
                      className="h-[27px] w-full appearance-none rounded-[4px] border border-[#cfd6de] bg-white px-[8px] pr-[27px] text-[9px] text-[#8d969f] outline-none"
                    >
                      <option value="">
                        {loadingCustomers
                          ? "Loading customer..."
                          : "Choose customer"}
                      </option>

                      {customers.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name ||
                            item.company_name ||
                            `Customer ${item.id}`}
                        </option>
                      ))}
                    </select>

                    <CaretDown
                      size={11}
                      className="pointer-events-none absolute right-[8px] top-1/2 -translate-y-1/2 text-[#5f6871]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-[6px] block text-[9px] font-semibold text-[#30343a]">
                    Email
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    className="h-[27px] w-full rounded-[4px] border border-[#cfd6de] px-[8px] text-[9px] outline-none placeholder:text-[#9aa2ab]"
                  />
                </div>

                <div className="flex items-center justify-end">
                  <div className="text-[16px] font-semibold text-[#292e34]">
                    Total Rp{formatCurrency(total)}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-[15px] py-[15px]">
              <div className="grid grid-cols-4 gap-x-[15px]">
                <div>
                  <label className="mb-[6px] block text-[9px] font-semibold text-[#30343a]">
                    Billing address
                  </label>

                  <textarea
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                    placeholder="e.g. Jalan Indonesia Blok C No. 22"
                    className="h-[76px] w-full resize-none rounded-[4px] border border-[#cfd6de] px-[8px] py-[7px] text-[9px] outline-none placeholder:text-[#9aa2ab]"
                  />
                </div>

                <div>
                  <label className="mb-[6px] block text-[9px] font-semibold text-[#30343a]">
                    Transaction date
                  </label>

                  <input
                    type="date"
                    value={transactionDate}
                    onChange={(e) => setTransactionDate(e.target.value)}
                    className="h-[27px] w-full rounded-[4px] border border-[#cfd6de] bg-white px-[8px] text-[9px] outline-none"
                  />

                  <label className="mb-[6px] mt-[15px] block text-[9px] font-semibold text-[#30343a]">
                    Due date
                  </label>

                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="h-[27px] w-full rounded-[4px] border border-[#cfd6de] bg-white px-[8px] text-[9px] outline-none"
                  />

                  <label className="mb-[6px] mt-[15px] block text-[9px] font-semibold text-[#30343a]">
                    Term
                  </label>

                  <div className="relative">
                    <select
                      value={term}
                      onChange={(e) => setTerm(e.target.value)}
                      className="h-[27px] w-full appearance-none rounded-[4px] border border-[#cfd6de] bg-white px-[8px] pr-[26px] text-[9px] outline-none"
                    >
                      <option>Net 30</option>
                      <option>Net 15</option>
                      <option>Net 45</option>
                      <option>Net 60</option>
                    </select>

                    <CaretDown
                      size={11}
                      className="pointer-events-none absolute right-[8px] top-1/2 -translate-y-1/2 text-[#5f6871]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-[6px] flex items-center gap-[4px] text-[9px] font-semibold text-[#30343a]">
                    Transaction no.
                    <Gear size={11} className="text-[#7b848d]" />
                  </label>

                  <input
                    value={transactionNo}
                    onChange={(e) => setTransactionNo(e.target.value)}
                    className="h-[27px] w-full rounded-[4px] border border-[#cfd6de] bg-white px-[8px] text-[9px] outline-none"
                  />

                  <label className="mb-[6px] mt-[15px] block text-[9px] font-semibold text-[#30343a]">
                    Customer reference no.
                  </label>

                  <input
                    value={customerReferenceNo}
                    onChange={(e) => setCustomerReferenceNo(e.target.value)}
                    className="h-[27px] w-full rounded-[4px] border border-[#cfd6de] bg-white px-[8px] text-[9px] outline-none"
                  />

                  <label className="mb-[6px] mt-[15px] block text-[9px] font-semibold text-[#30343a]">
                    Warehouse
                  </label>

                  <div className="relative">
                    <select
                      value={warehouse}
                      onChange={(e) => setWarehouse(e.target.value)}
                      className="h-[27px] w-full appearance-none rounded-[4px] border border-[#cfd6de] bg-white px-[8px] pr-[26px] text-[9px] text-[#8d969f] outline-none"
                    >
                      <option value="">Select warehouse</option>
                      <option value="Warehouse 1">Warehouse 1</option>
                      <option value="Warehouse 2">Warehouse 2</option>
                    </select>

                    <CaretDown
                      size={11}
                      className="pointer-events-none absolute right-[8px] top-1/2 -translate-y-1/2 text-[#5f6871]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-[6px] block text-[9px] font-semibold text-[#30343a]">
                    Tag
                  </label>

                  <input
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Choose tag"
                    className="h-[27px] w-full rounded-[4px] border border-[#cfd6de] bg-white px-[8px] text-[9px] outline-none placeholder:text-[#9aa2ab]"
                  />
                </div>
              </div>

              <div className="mt-[27px] flex justify-end">
                <label className="flex items-center gap-[5px] text-[8px] text-[#464c53]">
                  <input
                    type="checkbox"
                    checked={priceIncludesTax}
                    onChange={(e) => setPriceIncludesTax(e.target.checked)}
                    className="h-[12px] w-[12px]"
                  />
                  Price includes tax
                </label>
              </div>

              <div className="mt-[17px] overflow-x-auto">
                <table className="w-full min-w-[1100px] border-collapse">
                  <thead>
                    <tr className="h-[34px] bg-[#f7f9fb]">
                      <th className="w-[250px] border-y border-[#d9dfe5] px-[6px] text-left text-[9px] font-semibold">
                        Product
                      </th>

                      <th className="w-[185px] border-y border-[#d9dfe5] px-[6px] text-left text-[9px] font-semibold">
                        Description
                      </th>

                      <th className="w-[72px] border-y border-[#d9dfe5] px-[6px] text-center text-[9px] font-semibold">
                        Qty
                      </th>

                      <th className="w-[88px] border-y border-[#d9dfe5] px-[6px] text-left text-[9px] font-semibold">
                        Units
                      </th>

                      <th className="w-[120px] border-y border-[#d9dfe5] px-[6px] text-right text-[9px] font-semibold">
                        Unit price
                      </th>

                      <th className="w-[110px] border-y border-[#d9dfe5] px-[6px] text-right text-[9px] font-semibold">
                        Discount %
                      </th>

                      <th className="w-[90px] border-y border-[#d9dfe5] px-[6px] text-right text-[9px] font-semibold">
                        Tax %
                      </th>

                      <th className="w-[140px] border-y border-[#d9dfe5] px-[6px] text-right text-[9px] font-semibold">
                        Amount
                      </th>

                      <th className="w-[30px] border-y border-[#d9dfe5]" />
                    </tr>
                  </thead>

                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index} className="h-[43px]">
                        <td className="border-b border-[#d9dfe5] px-[6px]">
                          <div className="relative">
                            <select
                              value={item.product}
                              onChange={(e) =>
                                updateItem(index, "product", e.target.value)
                              }
                              className="h-[28px] w-full appearance-none rounded-[4px] border border-[#cfd6de] bg-white px-[8px] pr-[24px] text-[9px] text-[#929aa3] outline-none"
                            >
                              <option value="">Select product</option>
                              <option value="Product A">Product A</option>
                              <option value="Product B">Product B</option>
                            </select>

                            <CaretDown
                              size={10}
                              className="pointer-events-none absolute right-[8px] top-1/2 -translate-y-1/2 text-[#606872]"
                            />
                          </div>
                        </td>

                        <td className="border-b border-[#d9dfe5]" />
                        <td className="border-b border-[#d9dfe5]" />
                        <td className="border-b border-[#d9dfe5]" />
                        <td className="border-b border-[#d9dfe5]" />
                        <td className="border-b border-[#d9dfe5]" />
                        <td className="border-b border-[#d9dfe5]" />
                        <td className="border-b border-[#d9dfe5]" />
                        <td className="border-b border-[#d9dfe5]" />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-[14px] grid grid-cols-[380px_1fr] gap-[28px]">
                <div>
                  <label className="mb-[5px] block text-[9px] font-semibold">
                    Message
                  </label>

                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message"
                    className="h-[52px] w-full resize-none rounded-[4px] border border-[#cfd6de] px-[8px] py-[6px] text-[9px] outline-none placeholder:text-[#99a1aa]"
                  />

                  <label className="mb-[5px] mt-[10px] block text-[9px] font-semibold">
                    Memo
                  </label>

                  <textarea
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    placeholder="Memo"
                    className="h-[52px] w-full resize-none rounded-[4px] border border-[#cfd6de] px-[8px] py-[6px] text-[9px] outline-none placeholder:text-[#99a1aa]"
                  />

                  <label className="mb-[5px] mt-[10px] block text-[9px] font-semibold">
                    Attachments
                  </label>

                  <div className="flex h-[25px] items-center overflow-hidden rounded-[4px] border border-[#cfd6de]">
                    <label className="cursor-pointer border-r border-[#cfd6de] px-[8px] text-[8px] font-medium text-[#5875c9]">
                      Choose file
                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>

                    <span className="px-[8px] text-[7px] text-[#98a0a8]">
                      or drag or drop file here
                    </span>
                  </div>

                  <p className="mt-[3px] text-[7px] text-[#747c85]">
                    Files can be Excel, Word, PDF, JPG, PNG, or ZIP (maximum 5
                    files and 10 MB per file).
                  </p>

                  {files.length > 0 && (
                    <div className="mt-[4px] text-[7px] text-[#555b63]">
                      {files.map((file) => (
                        <div key={file.name}>{file.name}</div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between py-[4px] text-[9px]">
                    <span>Subtotal</span>
                    <span>Rp{formatCurrency(subtotal)}</span>
                  </div>

                  <div className="flex items-center justify-between py-[4px] text-[9px]">
                    <span>Discount per lines</span>
                    <span>Rp{formatCurrency(discountPerLines)}</span>
                  </div>

                  <div className="flex items-center justify-between py-[4px] text-[9px]">
                    <span>Discount</span>

                    <div className="flex items-center overflow-hidden rounded-[4px] border border-[#cfd7df]">
                      <select
                        value={discountType}
                        onChange={(e) => setDiscountType(e.target.value)}
                        className="h-[24px] border-r border-[#cfd7df] bg-[#f8fafc] px-[6px] text-[8px] outline-none"
                      >
                        <option>%</option>
                        <option>Rp</option>
                      </select>

                      <input
                        type="number"
                        min="0"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        className="h-[24px] w-[90px] px-[6px] text-right text-[8px] outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-b border-dashed border-[#dfe4e8] py-[4px] text-[9px]">
                    <span>Tax</span>
                    <span>Rp{formatCurrency(tax)}</span>
                  </div>

                  <div className="flex items-center justify-between py-[7px] text-[10px] font-semibold">
                    <span>Total</span>
                    <span>Rp{formatCurrency(total)}</span>
                  </div>

                  <label className="flex items-center gap-[5px] text-[8px] text-[#59616a]">
                    <input
                      type="checkbox"
                      checked={withholding}
                      onChange={(e) => setWithholding(e.target.checked)}
                      className="h-[11px] w-[11px]"
                    />
                    Withholding
                  </label>

                  <div className="mt-[13px] border-t border-dashed border-[#dfe4e8] pt-[8px]">
                    <div className="flex items-center justify-between text-[11px] font-semibold">
                      <span>Balance due</span>
                      <span>Rp{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-[23px] flex justify-end gap-[6px] border-t border-[#e1e5e9] pt-[9px]">
                <button
                  type="button"
                  onClick={() => (window.location.href = "/penjualan")}
                  className="h-[26px] rounded-[4px] px-[11px] text-[8px] text-[#59616a]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className={`flex h-[26px] items-center gap-[7px] rounded-[4px] px-[11px] text-[8px] ${
                    saving
                      ? "bg-[#d6dbe0] text-[#8b9299]"
                      : "bg-[#2563eb] text-white hover:bg-[#1d4ed8]"
                  }`}
                >
                  {saving ? "Saving..." : "Create"}
                  <CaretDown size={8} />
                </button>

                <button
                  type="button"
                  disabled={saving}
                  onClick={handleSubmit}
                  className={`flex h-[26px] items-center gap-[7px] rounded-[4px] px-[11px] text-[8px] ${
                    saving
                      ? "bg-[#d6dbe0] text-[#8b9299]"
                      : "bg-[#2563eb] text-white hover:bg-[#1d4ed8]"
                  }`}
                >
                  {saving ? "Saving..." : "Create and share"}
                  <CaretDown size={8} />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
