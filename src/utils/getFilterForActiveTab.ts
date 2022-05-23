export const getFilterForActiveTab = (activeTab: string, userId: string) => {
  switch (activeTab) {
    case 'owned':
      return {
        owner: userId,
        on_any_sale: false,
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
        on_any_sale: false,
      };
    case 'sold':
      return {
        sold_by: userId,
        on_any_sale: false,
      };
    default:
      return {};
  }
};
