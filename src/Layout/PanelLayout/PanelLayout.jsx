import { useEffect, useState } from "react";
import styles from "./PanelLayout.module.scss";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe } from "../../store/slices/Admin.slice";
import NavBar from "../../components/PopUp/NavBar/NavBar";
import Loader from "../../components/Loader/Loader";
import ResponsiveHeader from "../../components/ResponsiveHeader/ResponsiveHeader";
import { useLocation } from "react-router-dom";
import useAccessControl from "../../hooks/useAccessControl";

const PanelLayout = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  useEffect(() => {
    if (!admin.data && !admin.loading) {
      navigate("/notAllowed");
    }
  }, [admin]);
  useAccessControl(admin)

  if (admin.loading) {
    return <Loader />;
  }
  return (
    <div className={styles.layout}>
      <NavBar isActive={active} setActive={() => setActive(false)} />
      <ResponsiveHeader setActive={() => setActive(true)} />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default PanelLayout;
