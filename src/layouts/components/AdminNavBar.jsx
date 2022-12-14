import React from "react";
import { Link } from "react-router-dom";
import { BookIcon, CheckBoxIcon, CreateIcon, CubeIcon, FolderIcon, HomeIcon, SettingIcon } from "../../components/Icon";
import AdminNavItem from "./AdminNavItem";

function AdminNavBar() {
    const MENU_LIST = [
        {
            name: "Về trang chủ",
            path: "/",
            icon: <HomeIcon className='w-5 h-5 text-white' />,
            target: "_blank",
            rel: "noopener noreferrer",
        },
        {
            name: "Quản lí chuyên đề",
            path: "/admin/structure",
            icon: <SettingIcon className='w-5 h-5 text-white' />,
        },
        {
            name: "Quản lí lý thuyết",
            path: "/admin/theory",
            icon: <BookIcon className='w-5 h-5 text-white' />,
        },
        {
            name: "Quản lí câu hỏi điền khuyết",
            path: "/admin/defect",
            icon: <CreateIcon className='w-5 h-5 text-white' />,
        },
        {
            name: "Quản lí câu hỏi trắc nghiệm",
            path: "/admin/multiple-choice",
            icon: <CheckBoxIcon className='w-5 h-5 text-white' />,
        },
        {
            name: "Quản lí ngân hàng đề",
            path: "/admin/question",
            icon: <FolderIcon className='w-5 h-5 text-white' />,
        },
        {
            name: "Quản lí hình học 3D",
            path: "/admin/geogebra",
            icon: <CubeIcon className='w-5 h-5 text-white' />,
        },
    ];

    return (
        <aside className='flex flex-col h-[calc(100vh - 32px)] m-4 w-[300px] admin-bar-bg rounded-xl'>
            <div className='flex items-center justify-center h-20 text-xl border-b'>
                <Link className='text-white' to='/admin'>
                    Admin page
                </Link>
            </div>
            <div className='flex-1 mt-4 overflow-auto'>
                {MENU_LIST.map((item) => (
                    <AdminNavItem key={item.name} {...item} />
                ))}
            </div>
        </aside>
    );
}

export default AdminNavBar;
