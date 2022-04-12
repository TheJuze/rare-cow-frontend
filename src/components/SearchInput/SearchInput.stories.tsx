import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { SearchInput } from './SearchInput';
import { searchInputPropsMocked } from './SearchInput.mock';

export default {
  title: 'components/SearchInput',
  component: SearchInput,
} as ComponentMeta<typeof SearchInput>;

const Template: ComponentStory<typeof SearchInput> = (args) => {
  const [searchValue, setSearchValue] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const [searchResults, setSearchResults] = useState([]);

  const onSearch = () => {
    setIsFetching(true);
    setTimeout(() => {
      setIsFetching(false);
    }, 1000);
  };

  const handleInput = (e) => {
    setSearchValue(e.target.value);
    if (!searchResults.length) {
      setSearchResults(searchInputPropsMocked.presearchedNfts);
    }
  };

  const handleClear = () => {
    setSearchValue('');
  };
  return (
    <div style={{ padding: '40px 0', margin: '0 auto' }}>
      <SearchInput
        {...args}
        searchValue={searchValue}
        isSearchResultsLoading={isFetching}
        onSearch={onSearch}
        onSearchValueChange={handleInput}
        onClearSearch={handleClear}
      />
    </div>
  );
};
export const Default = Template.bind({});

Default.args = searchInputPropsMocked;
