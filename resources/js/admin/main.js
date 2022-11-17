import subMenuToggleContent, {closeSubMenuContentIfOpen, menuToggle, subMenuToggle} from "./partial/sub-menu";
import ImageLoader from "./components/ImageLoader";
import {KhChart} from "./components/KhChart";
import welcomeModalCloseAction from "./partial/welcome-message";
import KhSelect from "./components/selectCustom/KhSelect";
import KhMediaStore from "./components/media-store/KhMediaStore";
import ChipBuilder from "./components/ChipBuilder";
import TabBar from "./components/TabBar";
import panelAction from "./partial/panel";
import switchValueToggle from "./partial/switch";
import activeFieldParent from "./partial/field";
import closeAlertAction from "./partial/alert";
import CheckboxGroup from "./components/CheckboxGroup";
import BtnToggle from "./partial/buttonToggle";

import tagView from "./partial/tag";
import customSelect from "./partial/custom-select";
import TableView from "./components/table";

document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('kh-app-body-nav-bar-item-btn');

    subMenuToggleContent(toggleBtn);
    menuToggle();
    //searchInTable();
    //globalSearch();
    closeAlertAction();
    welcomeModalCloseAction();
    //invoicePrint();
    panelAction();
    switchValueToggle();
    activeFieldParent();
    closeAlertAction();
   // modalAction();

    new TableView();

    tagView();
    customSelect();

    (new ImageLoader()).start();
    (new BtnToggle()).start();


    new CheckboxGroup();
    new KhSelect('kh-select-native');
    new KhMediaStore();
    new KhMediaStore('img-media-store_');
    new ChipBuilder();
    new TabBar();

    document.documentElement.addEventListener('click', function () {
        closeSubMenuContentIfOpen(toggleBtn.nextElementSibling);
    });

    //components
    new KhChart();



});
