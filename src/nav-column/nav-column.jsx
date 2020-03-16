import React from "react";
import "./nav-column.css";

export const NavColumn = ({
  selectedChannel,
  onSectionChange,
  allChannels,
  allPeople
}) => {
  const itemClass = sectionTitle =>
    `NavItem-button ${selectedChannel === sectionTitle ? "selected" : ""}`;

  const getSectionName = (arr, type) => {
    const sectionNames = arr.map(name => name[type]);
    return sectionNames;
  };

  return (
    <div>
      <NavSection
        sectionTitle="channels"
        sectionNames={getSectionName(allChannels, "channelname")}
        selectedChannel={selectedChannel}
        onSectionChange={onSectionChange}
        itemClass={itemClass}
      />
      <NavSection
        sectionTitle="people"
        sectionNames={getSectionName(allPeople, "username")}
        selectedChannel={selectedChannel}
        onSectionChange={onSectionChange}
        itemClass={itemClass}
      />
    </div>
  );
};

const NavSection = ({
  sectionTitle,
  sectionNames,
  onSectionChange,
  itemClass
}) => {
  return (
    <div className="NavSection">
      <h3 className="NavSection-title">{sectionTitle}</h3>
      <ul className="NavSection-items">
        {sectionNames.map(name => (
          <li key={name}>
            <NavItem
              itemClass={itemClass}
              sectionTitle={sectionTitle}
              sectionName={name}
              onSelect={onSectionChange}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const NavItem = ({ sectionTitle, sectionName, onSelect, itemClass }) => {
  switch (sectionTitle) {
    default:
    case "channel":
      return (
        <div
          className={itemClass(sectionName)}
          onClick={() => onSelect(sectionName)}
        >
          # {sectionName}
        </div>
      );
    case "people":
      return (
        <div
          className={itemClass(sectionName)}
          onClick={() => onSelect(sectionName)}
        >
          {sectionName}
        </div>
      );
  }
};

export default NavColumn;
