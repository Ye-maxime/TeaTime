/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const TabItem = ({ tab, tabSelectedId, onClickTabItem }) => (
    <li
        className={`list-group-item justify-content-between ${tabSelectedId === tab.id && 'tab-selected'}`}
        onClick={onClickTabItem}
    >
        <span>{tab.name}</span>
    </li>
)

// eslint-disable-next-line react/no-multi-comp
const LeftSideBar = ({ tabList, tabSelectedId, clickTab }) => (
    <div>
        <ul className="list-group">
            {tabList.map((tab) => (
                <TabItem
                    key={tab.id}
                    id={tab.id}
                    tab={tab}
                    tabSelectedId={tabSelectedId}
                    onClickTabItem={() => clickTab(tab)}
                />
            ))}
        </ul>
    </div>
)

export default LeftSideBar;
