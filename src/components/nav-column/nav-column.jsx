import React from "react";
import "./nav-column.css";
import PropTypes from "prop-types";

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

NavColumn.propTypes = {
  selectedChannel: PropTypes.string.isRequired,
  onSectionChange: PropTypes.func.isRequired,
  allChannels: PropTypes.instanceOf(Array).isRequired,
  allPeople: PropTypes.instanceOf(Array).isRequired
};

const NavSection = ({
  sectionTitle,
  sectionNames,
  onSectionChange,
  itemClass
}) => (
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

NavSection.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  onSectionChange: PropTypes.func.isRequired,
  sectionNames: PropTypes.instanceOf(Array).isRequired,
  itemClass: PropTypes.func.isRequired
};

// Added role and tabIndex to div's below to satisfy eslint error - https://stackoverflow.com/questions/42225468/static-elements-interactions
// Added keyDown to satisfy eslint error - https://stackoverflow.com/questions/48575674/how-to-add-a-keyboard-listener-to-my-onclick-handler
// eslint-disable-next-line object-curly-newline
const NavItem = ({ sectionTitle, sectionName, onSelect, itemClass }) => {
  switch (sectionTitle) {
    default:
    case "channel":
      return (
        <div
          className={itemClass(sectionName)}
          onClick={() => onSelect(sectionName)}
          onKeyDown={() => onSelect(sectionName)}
          role="button"
          tabIndex="0"
        >
          #{sectionName}
        </div>
      );
    case "people":
      return (
        <div
          className={itemClass(sectionName)}
          onClick={() => onSelect(sectionName)}
          onKeyDown={() => onSelect(sectionName)}
          role="button"
          tabIndex="0"
        >
          {sectionName}
        </div>
      );
  }
};

NavItem.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  itemClass: PropTypes.func.isRequired
};

export default NavColumn;
