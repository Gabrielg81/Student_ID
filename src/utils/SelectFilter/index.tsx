import * as C from './styles';
type SelectFilterProps = {
  label: string;
  name: string;
  options: { id: string; value: string }[] | undefined;
  parseSelected: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectFilter: React.FC<SelectFilterProps> = ({
  label,
  name,
  options,
  parseSelected,
}) => (
  <C.Box>
    <p style={{ color: '#fff' }}>{label}</p>
    <select name={name} id={name} onChange={parseSelected}>
      <option value={''}>Selecione uma opção</option>
      {options?.map((option) => (
        <option key={option.id} value={option.id}>
          {option.value}
        </option>
      ))}
    </select>
  </C.Box>
);

export default SelectFilter;
