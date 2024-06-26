import { Utils } from "./Utils.js";
import { ContainerType } from "./ContainerType.js";
import { TabHost } from "./TabHost.js";
import { TabHostDirection } from "./enums/TabHostDirection.js";
export class FillDockContainer {
    dockManager;
    tabOrientation;
    name;
    element;
    containerElement;
    containerType;
    minimumAllowedChildNodes;
    tabHost;
    tabHostListener;
    state;
    constructor(dockManager, tabStripDirection) {
        if (tabStripDirection === undefined) {
            tabStripDirection = TabHostDirection.BOTTOM;
        }
        this.dockManager = dockManager;
        this.tabOrientation = tabStripDirection;
        this.name = Utils.getNextId('fill_');
        this.element = document.createElement('div');
        this.containerElement = this.element;
        this.containerType = ContainerType.fill;
        this.minimumAllowedChildNodes = 2;
        this.element.classList.add('dock-container');
        this.element.classList.add('dock-container-fill');
        this.tabHost = new TabHost(dockManager, this.tabOrientation);
        this.tabHostListener = {
            onChange: (e) => {
                this.dockManager._requestTabReorder(this, e);
            }
        };
        this.tabHost.addListener(this.tabHostListener);
        this.element.appendChild(this.tabHost.hostElement);
    }
    setActiveChild(child) {
        this.tabHost.setActiveTab(child);
    }
    resize(width, height) {
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
        this.tabHost.resize(width, height);
    }
    performLayout(children) {
        this.tabHost.performLayout(children);
    }
    destroy() {
        this.tabHost.pages.forEach(x => x.destroy());
        if (Utils.removeNode(this.element))
            delete this.element;
    }
    saveState(state) {
        state.width = this.width;
        state.height = this.height;
    }
    loadState(state) {
        // this.resize(state.width, state.height);
        // this.width = state.width;
        // this.height = state.height;
        this.state = { width: state.width, height: state.height };
    }
    get width() {
        // if(this.element.clientWidth === 0 && this.stateWidth !== 0)
        //     return this.stateWidth;
        return this.element.clientWidth;
    }
    set width(value) {
        this.element.style.width = value + 'px';
    }
    get height() {
        // if(this.element.clientHeight === 0 && this.stateHeight !== 0)
        //     return this.stateHeight;
        return this.element.clientHeight;
    }
    set height(value) {
        this.element.style.height = value + 'px';
    }
}
//# sourceMappingURL=FillDockContainer.js.map