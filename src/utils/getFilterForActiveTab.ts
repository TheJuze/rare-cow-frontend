export const getFilterForActiveTab = (activeTab: string, userId: string) => {
  switch (activeTab) {
    case 'owned':
      return {
        owner: userId,
      };
    case 'for-sale':
      return {
        owner: userId,
        on_any_sale: true,
      };
    case 'bided':
      return {
        bids_by: userId,
        on_any_sale: true,
      };
    case 'favorites':
      return {
        liked_by: userId,
      };
    case 'sold':
      return {
        sold_by: userId,
      };
    default:
      return {};
  }
};
