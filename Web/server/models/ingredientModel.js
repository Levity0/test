const supabase = require('../supabase');

const Ingredient = {
  // Add an ingredient
  async add(name, userId) {
    const { data, error } = await supabase
      .from('ingredients')
      .insert([{ name, user_id: userId }])
      .select();
    if (error) throw error;
    return data;
  },

  // Remove an ingredient
  async remove(name, userId) {
    const { data, error } = await supabase
      .from('ingredients')
      .delete()
      .eq('name', name)
      .eq('user_id', userId); 
    if (error) throw error;
    return data;
  }
};

module.exports = Ingredient;