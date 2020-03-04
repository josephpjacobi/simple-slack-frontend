import React from 'react';
import './nav-column.css';

export const NavColumn = ({ selectedChannel, onSectionChange, allChannels, allPeople }) => {
  const itemClass = sectionTitle =>
    `NavItem-button ${
      selectedChannel === sectionTitle ? 'selected' : ''}`;

  const getSectionKeys = obj => {
    return Object.keys(obj)
  };

  return (
    <div>
      <NavSection sectionTitle="channels" sectionKeys={getSectionKeys(allChannels)} selectedChannel={selectedChannel} onSectionChange={onSectionChange} itemClass={itemClass}/>
      <NavSection sectionTitle="people" sectionKeys={getSectionKeys(allPeople)} selectedChannel={selectedChannel} onSectionChange={onSectionChange} itemClass={itemClass}/>
    </div>
  )
};

const NavSection = ({ sectionTitle, sectionKeys, onSectionChange, itemClass }) => {
  return (
    <div className="NavSection">
      <h3 className="NavSection-title">{sectionTitle}</h3>
      <ul className="NavSection-items">
        {sectionKeys.map(key => 
        <li key={key}>
          <NavItem itemClass={itemClass} sectionTitle={sectionTitle} sectionKey={key} onSelect={onSectionChange}/>
        </li>
        )}
      </ul>
    </div>
  )
};

const NavItem = ({ sectionTitle, sectionKey, onSelect, itemClass }) => {
  switch (sectionTitle) {
    default: 
    case 'channel':
      return <div className={itemClass(sectionKey)} onClick={() => onSelect(sectionKey)}># {sectionKey}</div>;
    case 'people':
      return <div className={itemClass(sectionKey)} onClick={() => onSelect(sectionKey)}>{sectionKey}</div>
  }
}

export default NavColumn;
