import { supabase } from '../config/supabase.js';

/**
 * Supabase Service - Alternative to Prisma for Render deployment
 * Uses HTTPS requests instead of direct Postgres connection
 */

// User operations
export const userService = {
  async create(userData) {
    const { data, error } = await supabase
      .from('User')
      .insert([userData])
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  },

  async findByEmail(email) {
    const { data, error } = await supabase
      .from('User')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') throw new Error(error.message);
    return data;
  },

  async findById(id) {
    const { data, error } = await supabase
      .from('User')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  },

  async update(id, userData) {
    const { data, error } = await supabase
      .from('User')
      .update(userData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }
};

// Mood operations
export const moodService = {
  async create(moodData) {
    const { data, error } = await supabase
      .from('MoodEntry')
      .insert([moodData])
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  },

  async findByUserId(userId, limit = 10) {
    const { data, error } = await supabase
      .from('MoodEntry')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false })
      .limit(limit);
    
    if (error) throw new Error(error.message);
    return data;
  },

  async findById(id) {
    const { data, error } = await supabase
      .from('MoodEntry')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  },

  async update(id, moodData) {
    const { data, error } = await supabase
      .from('MoodEntry')
      .update(moodData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from('MoodEntry')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error(error.message);
    return true;
  }
};

// Journal operations
export const journalService = {
  async create(journalData) {
    const { data, error } = await supabase
      .from('JournalEntry')
      .insert([journalData])
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  },

  async findByUserId(userId, limit = 10) {
    const { data, error } = await supabase
      .from('JournalEntry')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false })
      .limit(limit);
    
    if (error) throw new Error(error.message);
    return data;
  },

  async findById(id) {
    const { data, error } = await supabase
      .from('JournalEntry')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  },

  async update(id, journalData) {
    const { data, error } = await supabase
      .from('JournalEntry')
      .update(journalData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from('JournalEntry')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error(error.message);
    return true;
  }
};

// Notification operations
export const notificationService = {
  async create(notificationData) {
    const { data, error } = await supabase
      .from('Notification')
      .insert([notificationData])
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  },

  async findByUserId(userId, limit = 20) {
    const { data, error } = await supabase
      .from('Notification')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false })
      .limit(limit);
    
    if (error) throw new Error(error.message);
    return data;
  },

  async markAsRead(id) {
    const { data, error } = await supabase
      .from('Notification')
      .update({ read: true })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }
};

// Reminder operations
export const reminderService = {
  async create(reminderData) {
    const { data, error } = await supabase
      .from('Reminder')
      .insert([reminderData])
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  },

  async findByUserId(userId) {
    const { data, error } = await supabase
      .from('Reminder')
      .select('*')
      .eq('userId', userId)
      .eq('active', true)
      .order('time', { ascending: true });
    
    if (error) throw new Error(error.message);
    return data;
  },

  async update(id, reminderData) {
    const { data, error } = await supabase
      .from('Reminder')
      .update(reminderData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from('Reminder')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error(error.message);
    return true;
  }
};

export default {
  userService,
  moodService,
  journalService,
  notificationService,
  reminderService
};