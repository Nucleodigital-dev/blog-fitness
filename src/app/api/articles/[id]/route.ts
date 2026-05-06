import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
    }

    const { data: article, error } = await supabase
      .from('articles')
      .select('id, slug, title_pt, content_pt, title_en, content_en, cover_image, cover_alt, category_id, is_featured, status, created_at')
      .eq('id', id)
      .single();

    if (error || !article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({ article });
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { id } = await params;
    const body = await request.json();
    const { title_pt, content_pt, title_en, content_en, slug, cover_image, cover_alt, category_id, is_featured, status } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
    }

    if (!title_pt || !content_pt || !slug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { error } = await supabase
      .from('articles')
      .update({
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
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating article:', error);
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
      }
      return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id, slug });
  } catch (error: any) {
    console.error('Error updating article:', error);
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    if (!id) {
      return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
    }

    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) throw error;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}
