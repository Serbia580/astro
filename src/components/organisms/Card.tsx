import { Separator } from '@kobalte/core';
import { type Component, For, Show } from 'solid-js';
import type { Tag as TagType } from '~/domain/model/post';
import { format } from '~/utils/dateToString';
import { truncate } from '~/utils/string';
import { Tag } from '../molecules/Tag';

type Props = {
    tags: string[];
    published: Date;
    updated: Date | null;
    body: string;
    slug: string;
};

export const Card: Component<Props> = (props) => {
    const [name] = props.slug.split('/').slice(-1);
    const publishedAt = format(props.published);
    const updatedAt = props.updated && format(props.updated);
    const url = name ? `/posts/${publishedAt}/${name}` : '/';
    const [_, ...textStartWithTitle] = props.body.split('# ');
    const [title, ...content] = textStartWithTitle.join('').split('\n');

    // TODO: エラーを返す
    const preview = truncate(content.join(''), 500);
    const date = publishedAt + updatedAt && ` last updated on ${updatedAt}`;
    return (
        <article class="hover:custom-shadow rounded-2xl border-2 border-solid border-transparent hover:border-secondary">
            <div class="py-4 px-2 sm:px-5">
                <div class="flex gap-1 items-center flex-wrap">
                    <span class="metadata">{date}</span>
                    <Show when={props.tags.length !== 0}>
                        <Separator.Root
                            orientation="vertical"
                            class="h-4 pr-px border-none bg-foreground/60 mx-1"
                        />
                    </Show>
                    <For each={props.tags}>{(tag) => <Tag name={tag as TagType} />}</For>
                </div>
                <a href={url}>
                    <h2 class="mb-2.5 border-b border-tertiary pb-1.5 text-xl text-primary sm:text-2xl">
                        {title ?? 'No title'}
                    </h2>
                    <p class="bg-gradient-to-b from-foreground via-foreground/80 to-foreground/20 bg-clip-text text-transparent line-clamp-5 sm:text-lg">
                        {preview}
                    </p>
                </a>
            </div>
        </article>
    );
};