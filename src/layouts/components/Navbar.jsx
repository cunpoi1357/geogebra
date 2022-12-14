import { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import clsx from "clsx";

import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { InfoIcon, LoginIcon, LogoutIcon, PhoneIcon, PriceTagIcon } from "../../components/Icon";
import NavParent from "./NavParent";
import { auth } from "../../firebase";
import CreateTestYourSelfModal from "../../components/TestYourSelf/CreateTestYourSelfModal";
import CreateGeogebraModal from "../../components/Geogebra/CreateGeogebraModal";

function Navbar({ expandedMenu, onOpenMenu, onCloseMenu }) {
    const { topics } = useContext(AppContext);
    const { user } = useContext(AuthContext);
    const location = useLocation();

    const [isCreateTestModalShow, setCreateTestModalShow] = useState(false);
    const [isCreateGeogebraModalShow, setCreateGeogebraModalShow] = useState(false);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                toast.success("Đăng xuất thành công!");
                onCloseMenu();
            })
            .catch((error) => toast.error(error.message));
    };

    useEffect(() => {
        setCreateTestModalShow(false);
        setCreateGeogebraModalShow(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <aside
            className={clsx(
                "flex-col lg:flex lg:mx-0 bg-[#0060a7] overflow-auto",
                expandedMenu ? "w-full lg:w-auto mx-4 md:mx-0" : "mx-0 w-0 lg:w-auto"
            )}
            onClick={onOpenMenu}
        >
            <div className={clsx("transition-all ease-linear", expandedMenu ? "w-full md:w-[400px]" : "w-16")}>
                {topics.map((item) => (
                    <NavParent key={item.name} expandedMenu={expandedMenu} {...item} />
                ))}
                <button
                    className='text-[#92a6e2] h-[72px] w-full flex cursor-pointer hover:bg-[#4360b5] hover:text-white transition-colors ease-linear outline-none'
                    onClick={() => setCreateGeogebraModalShow(true)}
                >
                    <span
                        className={clsx(
                            "transition-all ease-linear flex items-center justify-center",
                            expandedMenu ? "h-[72px] w-[72px]" : "h-[72px] w-16"
                        )}
                    >
                        <PriceTagIcon className='h-6 mr-1' />
                    </span>
                    <span
                        className={clsx(
                            "py-6 pr-6 transition-all ease-linear whitespace-nowrap overflow-hidden",
                            expandedMenu ? "inline-block" : "hidden"
                        )}
                    >
                        Tạo mô hình 3D
                    </span>
                </button>
                <button
                    className='text-[#92a6e2] h-[72px] w-full flex cursor-pointer hover:bg-[#4360b5] hover:text-white transition-colors ease-linear outline-none'
                    onClick={() => setCreateTestModalShow(true)}
                >
                    <span
                        className={clsx(
                            "transition-all ease-linear flex items-center justify-center",
                            expandedMenu ? "h-[72px] w-[72px]" : "h-[72px] w-16"
                        )}
                    >
                        <PriceTagIcon className='h-6 mr-1' />
                    </span>
                    <span
                        className={clsx(
                            "py-6 pr-6 transition-all ease-linear whitespace-nowrap overflow-hidden",
                            expandedMenu ? "inline-block" : "hidden"
                        )}
                    >
                        Đề tự luyện
                    </span>
                </button>
            </div>
            <hr className='lg:hidden' />
            <div className='lg:hidden pb-40 lg:pb-0'>
                <Link
                    to='/about'
                    className='text-[#92a6e2] h-[72px] w-full flex items-center cursor-pointer hover:bg-[#4360b5] hover:text-white transition-colors ease-linear outline-none'
                >
                    <span
                        className={clsx(
                            "transition-all ease-linear flex items-center justify-center",
                            expandedMenu ? "h-[72px] w-[72px]" : "h-[72px] w-16"
                        )}
                    >
                        <InfoIcon className='h-6 mr-1' />
                    </span>
                    <span>Giới thiệu</span>
                </Link>
                <Link
                    to='/contact'
                    className='text-[#92a6e2] h-[72px] w-full flex items-center cursor-pointer hover:bg-[#4360b5] hover:text-white transition-colors ease-linear outline-none'
                >
                    <span
                        className={clsx(
                            "transition-all ease-linear flex items-center justify-center",
                            expandedMenu ? "h-[72px] w-[72px]" : "h-[72px] w-16"
                        )}
                    >
                        <PhoneIcon className='h-6 mr-1' />
                    </span>
                    <span className='inline-block'>Liên hệ</span>
                </Link>
                {user?.email ? (
                    <button
                        className='text-[#92a6e2] h-[72px] w-full flex items-center cursor-pointer hover:bg-[#4360b5] hover:text-white transition-colors ease-linear outline-none'
                        onClick={handleLogout}
                    >
                        <span
                            className={clsx(
                                "transition-all ease-linear flex items-center justify-center",
                                expandedMenu ? "h-[72px] w-[72px]" : "h-[72px] w-16"
                            )}
                        >
                            <LogoutIcon className='h-6 mr-1' />
                        </span>
                        <span>Đăng xuất</span>
                    </button>
                ) : (
                    <Link
                        to='/login'
                        className='text-[#92a6e2] h-[72px] w-full flex items-center cursor-pointer hover:bg-[#4360b5] hover:text-white transition-colors ease-linear outline-none'
                    >
                        <span
                            className={clsx(
                                "transition-all ease-linear flex items-center justify-center",
                                expandedMenu ? "h-[72px] w-[72px]" : "h-[72px] w-16"
                            )}
                        >
                            <LoginIcon className='h-6 mr-1' />
                        </span>
                        <span>Đăng nhập</span>
                    </Link>
                )}
            </div>
            <CreateTestYourSelfModal isOpen={isCreateTestModalShow} onClose={() => setCreateTestModalShow(false)} />
            <CreateGeogebraModal isOpen={isCreateGeogebraModalShow} onClose={() => setCreateGeogebraModalShow(false)} />
        </aside>
    );
}

export default Navbar;
