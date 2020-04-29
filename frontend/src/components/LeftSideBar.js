import React from 'react';

const TabItem = ({ tab, tabSelectedId, onClickTabItem }) => (
    <li className={`list-group-item justify-content-between ${tabSelectedId === tab.id && "tab-selected"}`}
        onClick={onClickTabItem}>
        <span>{tab.name}</span>
    </li>
)

const LeftSideBar = props => {
    return (
        <div>
            <ul className='list-group'>
                {props.tabList.map((tab) =>
                    <TabItem
                        key={tab.id}
                        id={tab.id}
                        tab={tab}
                        tabSelectedId={props.tabSelectedId}
                        onClickTabItem={() => props.clickTab(tab)}
                    />
                )}
            </ul>
        </div>
    );
}

export default LeftSideBar;