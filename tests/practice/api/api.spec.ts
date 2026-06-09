import { test, expect } from '@playwright/test';

test('Get all posts', async ({ request }) => {
    const response = await request.get(
        'https://jsonplaceholder.typicode.com/posts',
    );

    // console.log(response);
    // console.log(response.status());
    // console.log(await response.json());
    const posts = await response.json();
    const firstPost = posts[0];
    expect(response.status()).toBe(200);
    expect(posts).toHaveLength(100);
    expect(firstPost.title).toContain('facere repellat provident');
});

test('Create new post', async ({ request }) => {
    const response = await request.post(
        'https://jsonplaceholder.typicode.com/posts',
        { data: { title: 'foo', body: 'bar', userId: 1 } },
    );

    const createdPost = await response.json();
    expect(response.status()).toBe(201);
    expect(createdPost.title).toBe('foo');
    expect(createdPost.body).toBe('bar');
    expect(createdPost.userId).toBe(1);
});

test('Create new post with object', async ({ request }) => {
    const newPost = { title: 'foo', body: 'bar', userId: 1 };

    const response = await request.post(
        'https://jsonplaceholder.typicode.com/posts',
        { data: newPost },
    );

    const createdPost = await response.json();
    expect(response.status()).toBe(201);
    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
    expect(createdPost.userId).toBe(newPost.userId);
});

test('Update a post', async ({ request }) => {
    const newPostData = { title: 'foo', body: 'bar', userId: 1 };

    const response = await request.put(
        'https://jsonplaceholder.typicode.com/posts/3',
        { data: newPostData },
    );

    const updatedPost = await response.json();
    console.log(updatedPost);

    expect(response.status()).toBe(200);
    expect(updatedPost.title).toBe(newPostData.title);
    expect(updatedPost.body).toBe(newPostData.body);
    expect(updatedPost.userId).toBe(newPostData.userId);
});

test('Delete a post', async ({ request }) => {
    const response = await request.delete(
        'https://jsonplaceholder.typicode.com/posts/5',
    );

    // console.log(await response.text());
    expect(response.status()).toBe(200);
});

test.describe;
