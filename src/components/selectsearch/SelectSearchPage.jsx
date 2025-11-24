import { useImmer } from 'use-immer';
import Filters from './Filters';
import { GridView } from './GridView';

export default function SelectSearchPage() {
  const [conditions, setConditions] = useImmer({
    parent: '',
    children: [],
    grandChildren: [],
    useYn: '',
  });

  const [searchTrigger, setSearchTrigger] = useImmer(0);

  return (
    <div>
      <Filters
        conditions={conditions}
        setConditions={setConditions}
        onSearch={() => setSearchTrigger(p => p + 1)}
      />

      <GridView searchTrigger={searchTrigger} conditions={conditions} />
    </div>
  );
}
