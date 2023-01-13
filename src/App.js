import { ThemeProvider } from "./context/Themes";
import { LoaderProvider } from "./context/Preloader";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { Overview, Documentation, ChangeLog, Error } from "./pages/supports";
import { Avatars, Alerts, Buttons, Charts, Tables, Fields, Headings, Colors } from "./pages/blocks";
import {
    Ecommerce, Analytics, CRM, ForgotPassword, Register, Login, UserList, UserProfile, MyAccount,
    ProductList, ProductView, ProductUpload, InvoiceList, InvoiceDetails, OrderList, Message,
    Notification, BlankPage, Settings
} from "./pages/master";

import TypeMaster from './pages/master/TypeMaster';
import DepartmentMaster from "./pages/master/DepartmentMaster";
import UserRoleMaster from "./pages/master/UserRoleMaster";
import CompanyMasterForm from "./pages/master/CompanyMasterForm";
import TaxMaster from "./pages/master/TaxMaster";

import RackMaster from "./pages/master/RackMaster";
import ManufactureCompanyMaster from "./pages/master/ManufactureCompanyMaster";

export default function App() {
    return (
        <ThemeProvider>
            <LoaderProvider>
                <HashRouter>
                    <Routes>
                        {/* master Pages */}
                        <Route path="/ecommerce" element={<Ecommerce />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/crm" element={<CRM />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/user-list" element={<UserList />} />
                        <Route path="/user-profile" element={<UserProfile />} />
                        <Route path="/my-account" element={<MyAccount />} />
                        <Route path="/product-list" element={<ProductList />} />
                        <Route path="/product-view" element={<ProductView />} />
                        <Route path="/product-upload" element={<ProductUpload />} />
                        <Route path="/invoice-list" element={<InvoiceList />} />
                        <Route path="/invoice-details" element={<InvoiceDetails />} />
                        <Route path="/order-list" element={<OrderList />} />
                        <Route path="/message" element={<Message />} />
                        <Route path="/notification" element={<Notification />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/blank-page" element={<BlankPage />} />

                        <Route path="/m001" element={<TypeMaster />} />
                        <Route path="/m002" element={<DepartmentMaster />} />
                        <Route path="/m003" element={<UserRoleMaster />} />
                        <Route path="/m004" element={<CompanyMasterForm />} />
                        <Route path="/m005" element={<RackMaster />} />
                        <Route path="/m006" element={<TaxMaster />} />
                        <Route path="/m007" element={<ManufactureCompanyMaster />} />
                        
                        
                        {/* Blocks Pages */}
                        <Route path="/headings" element={<Headings />} />
                        <Route path="/buttons" element={<Buttons />} />
                        <Route path="/avatars" element={<Avatars />} />
                        <Route path="/colors" element={<Colors />} />
                        <Route path="/charts" element={<Charts />} />
                        <Route path="/tables" element={<Tables />} />
                        <Route path="/fields" element={<Fields />} />
                        <Route path="/alerts" element={<Alerts />} />

                        {/* Supports Pages */}
                        <Route path="*" element={<Error />} />
                        {/* <Route path="/" element={<Overview />} /> */}
                        <Route path="/" element={<Ecommerce />} />
                        <Route path="/documentation" element={<Documentation />} />
                        <Route path="/changelog" element={<ChangeLog />} />
                    </Routes>
                </HashRouter>
            </LoaderProvider>
        </ThemeProvider>
    );
}

