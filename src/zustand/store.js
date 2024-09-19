import supabase from "@/lib/supabase";
import { create } from "zustand";

export const useFilterStore = create((set) => ({
    // State variables
    province: "Any",
    city: "Any",
    propertyType: "Any",
    minPrice: "Any",
    maxPrice: "Any",
    followers: 5,

    // Functions to update the values
    changeProvince: (new_province) => set(() => ({province: new_province})),
    changeCity: (new_city) => set(() => ({city: new_city})),
    changePropertyType: (new_type) => set(() => ({propertyType: new_type})),
    changeMinPrice: (new_price) => set(() => ({minPrice: new_price})),
    changeMaxPrice: (new_price) => set(() => ({maxPrice: new_price}))
}))

export const usePropertiesStore = create((set) => ({
    // state variable
    properties: [],

    // Functions to update state
    setProperties: (list_of_properties) => set(() => ({properties: list_of_properties})) 
}) )


export const useAuthStore = create((set) => ({
    // state variable
    user: null,
    profile: null,
    agent: null,

    // Functions to update state (SETTERS)
    setUser: (user) => {
        set({ user });
        localStorage.setItem('user', JSON.stringify(user));
  },

    setProfile: (profile) => {
    set({ profile: profile });
    localStorage.setItem('profile', JSON.stringify(profile));
  },
  setAgent: (agent) => {
    set({ agent });
    localStorage.setItem('agent', JSON.stringify(agent));
  },

  clear: () => {
    set({agent: null, user: null, profile: null});
  },
  
  // Functions to Fetch state (GETTERS)
  async fetchUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      set({ user });
    } else {
      // Fetch user from Supabase if not found in local storage
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        set({ user: data.session.user });
      }
    }
  },


  async fetchProfile() {
    const profile = JSON.parse(localStorage.getItem('profile')) ?? null;
    if (profile) {
      set({ profile });
    } else {
      // Fetch profile from Supabase if not found in local storage
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        // Get Profile
        const {data: profiles} = await supabase.from('profiles').select().eq('id', data.session.user.id);
        set({ profile: profiles[0] });
      }
    }
  },

  async fetchAgent() {
    const agent = JSON.parse(localStorage.getItem('agent'));
    if (agent) {
      set({ agent });
    } else {
      // Fetch agent from Supabase if not found in local storage
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        // Get agent
        const {data: agents} = await supabase.from('agents').select().eq('profile_id', data.session.user.id);
        set({ agent: agents[0] });
      }
    }
  },

  
     
}) )

