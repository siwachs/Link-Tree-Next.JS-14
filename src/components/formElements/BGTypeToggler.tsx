import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToggleOption } from "@/../global";

const BGTypeToggler: React.FC<{
  togglerOptions: ToggleOption[];
  onChange?: () => void;
}> = ({ togglerOptions, onChange }) => {
  return (
    <div className="toggler shadow">
      {togglerOptions.map((option) => {
        const { id, name, value, icon, iconClassName, fixedWidth, label } =
          option;

        return (
          <label key={id}>
            <input type="radio" name={name} value={value} />
            <div>
              <FontAwesomeIcon
                icon={icon}
                className={iconClassName}
                fixedWidth={fixedWidth}
              />
              <span>{label}</span>
            </div>
          </label>
        );
      })}
    </div>
  );
};

export default BGTypeToggler;
