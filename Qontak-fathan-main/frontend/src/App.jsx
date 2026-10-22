import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AgentsPage from "./pages/AgentsPage";
import COAPage from "./pages/COAPage";
import CustomersPage from "./pages/CustomersPage";
import CompanyPage from "./pages/CompanyPage";
import UserManagement from "./pages/UserManagementPage";
import SalesPage from "./pages/SalesPage";
import PurchasesPage from "./pages/PurchasesPage";
import ProductsPage from "./pages/ProductsPage";
import ProductionsPage from "./pages/ProductionsPage";
import KategoriProdukPage from "./pages/KategoriProdukPage";

import KasBankPage from "./pages/kasbankpage";
import CreateBankAccountPage from "./pages/CreateBankAccountPage";
import CreateTransferPage from "./pages/CreateTransferPage";
import CreateReceiveMoneyPage from "./pages/CreateReceiveMoneyPage";
import CreateSendMoneyPage from "./pages/CreateSendMoneyPage";

import PenjualanPage from "./pages/PenjualanPage";
import PembelianPage from "./pages/PembelianPage";
import BiayaPage from "./pages/BiayaPage";
import CreateBiayaPage from "./pages/CreateBiayaPage";

import DaftarLainnya from "./pages/DaftarLainnya";
import DaftarTransaksiPage from "./pages/DaftarTransaksiPage";
import KategoriTagPage from "./pages/KategoriTagPage";
import KategoriTagArchivedPage from "./pages/KategoriTagArchivedPage";
import KategoriTagCustomDetailPage from "./pages/KategoriTagCustomDetailPage";
import JadwalBerulangPage from "./pages/JadwalBerulangPage";
import ClosingPeriodPage from "./pages/ClosingPeriodPage";

import CreateSalesInvoicePage from "./pages/CreateSalesInvoicePage";
import CreateSalesOrderPage from "./pages/CreateSalesOrderPage";
import CreateSalesQuotePage from "./pages/CreateSalesQuotePage";

import CreatePurchaseInvoicePage from "./pages/CreatePurchaseInvoicePage";
import CreatePurchaseExchangePage from "./pages/CreatePurchaseExchangePage";
import CreatePurchaseOrderPage from "./pages/CreatePurchaseOrderPage";
import CreatePurchaseQuotePage from "./pages/CreatePurchaseQuotePage";
import CreatePurchaseRequestPage from "./pages/CreatePurchaseRequestPage";

import MainLayout from "./components/layout/MainLayout";
import AuthGuard from "./components/layout/AuthGuard";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<AuthGuard />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/coa" element={<COAPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/usermanagement" element={<UserManagement />} />

          <Route path="/sales" element={<SalesPage />} />
          <Route path="/penjualan" element={<PenjualanPage />} />

          <Route
            path="/penjualan/invoice/create"
            element={<CreateSalesInvoicePage />}
          />
          <Route
            path="/penjualan/order/create"
            element={<CreateSalesOrderPage />}
          />
          <Route
            path="/penjualan/quote/create"
            element={<CreateSalesQuotePage />}
          />

          <Route path="/purchases" element={<PurchasesPage />} />
          <Route path="/pembelian" element={<PembelianPage />} />

          <Route
            path="/pembelian/faktur/create"
            element={<CreatePurchaseInvoicePage />}
          />
          <Route
            path="/pembelian/tukar-faktur/create"
            element={<CreatePurchaseExchangePage />}
          />
          <Route
            path="/pembelian/pesanan/create"
            element={<CreatePurchaseOrderPage />}
          />
          <Route
            path="/pembelian/penawaran/create"
            element={<CreatePurchaseQuotePage />}
          />
          <Route
            path="/pembelian/permintaan/create"
            element={<CreatePurchaseRequestPage />}
          />

          <Route path="/products" element={<ProductsPage />} />
          <Route path="/productions" element={<ProductionsPage />} />

          <Route path="/kas-bank" element={<KasBankPage />} />
          <Route path="/kas-bank/create" element={<CreateBankAccountPage />} />
          <Route
            path="/kas-bank/transfer/create"
            element={<CreateTransferPage />}
          />
          <Route
            path="/kas-bank/receive/create"
            element={<CreateReceiveMoneyPage />}
          />
          <Route
            path="/kas-bank/send/create"
            element={<CreateSendMoneyPage />}
          />

          <Route path="/biaya" element={<BiayaPage />} />
          <Route path="/biaya/create" element={<CreateBiayaPage />} />

          <Route path="/daftar-lainnya" element={<DaftarLainnya />} />
          <Route path="/daftar-transaksi" element={<DaftarTransaksiPage />} />

          <Route path="/kategori-tag" element={<KategoriTagPage />} />

          <Route
            path="/kategori-tag/custom/:categoryId"
            element={<KategoriTagCustomDetailPage />}
          />

          <Route
            path="/kategori-tag/archived"
            element={<KategoriTagArchivedPage title="Arsip" />}
          />

          <Route
            path="/kategori-tag/ungrouped"
            element={
              <KategoriTagArchivedPage
                title="Belum di-assign"
                showCreateButton
              />
            }
          />

          <Route path="/jadwal-berulang" element={<JadwalBerulangPage />} />

          <Route path="/closing-period" element={<ClosingPeriodPage />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
