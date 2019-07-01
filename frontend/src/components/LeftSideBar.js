import React, {Component} from 'react';

const TabItem = ({tab, tabSelectedId, onClickTabItem}) => (
    <li className={`list-group-item justify-content-between ${tabSelectedId === tab.id && "tab-selected"}`}
        onClick={onClickTabItem}>
        <span>{tab.name}</span>
    </li>
)

export default class LeftSideBar extends Component {
    render() {
        const {tabSelectedId, tabList, clickTab} = this.props
        return (
            <div>
                <ul className='list-group'>
                    {tabList.map((tab) =>
                        <TabItem
                            key={tab.id}
                            id={tab.id}
                            tab={tab}
                            tabSelectedId={tabSelectedId}
                            onClickTabItem={() => clickTab(tab)}
                        />
                    )}
                </ul>
            </div>
        );
    }
}