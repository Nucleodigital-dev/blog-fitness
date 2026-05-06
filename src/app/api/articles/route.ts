import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: articles, error } = await supabase
      .from('articles')
      .select('id, slug, title_pt, title_en, cover_image, cover_alt, category_id, is_featured, created_at')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return NextResponse.json({ articles });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const body = await request.json();
    const { title_pt, content_pt, title_en, content_en, slug, cover_image, cover_alt, category_id, is_featured, status } = body;
    
    if (!title_pt || !content_pt || !slug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const id = uuidv4();
    const { error } = await supabase.from('articles').insert({
      id,
      slug,
      title_pt,
      content_pt,
      title_en: title_en || '',
      content_en: content_en || '',
      cover_image: cover_image || '',
      cover_alt: cover_alt || '',
      category_id: category_id || null,
      is_featured: is_featured ? true : false,
      status: status || 'published'
    });
    
    if (error) {
      console.error('Error saving article:', error);
      if (error.code === '23505') {
         return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
      }
      throw error;
    }
    
    return NextResponse.json({ success: true, id, slug });
  } catch (error: any) {
    console.error('Error saving article:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
