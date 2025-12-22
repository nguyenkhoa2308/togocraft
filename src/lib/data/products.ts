// Re-export all data from polycarbonate-data module
export {
  polycarbonateDocProducts,
  polycarbonateSongProducts,
  polycarbonateRongProducts,
  phuKienProducts,
  getAllProducts,
  getProductsByCategory,
  getCategories,
  getRawProducts,
  menuCategories,
  featuredCategories,
  categoryListData,
} from './polycarbonate-data';

// Backwards compatibility aliases
export {
  polycarbonateDocProducts as gioKhayProducts,
  polycarbonateSongProducts as denMayProducts,
  polycarbonateRongProducts as decorProducts,
} from './polycarbonate-data';
