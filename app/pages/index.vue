<script setup lang='ts'>
import { Input } from '~/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

const chats = ref([
	{
		id: '1234',
		name: 'John Doe',
		profilePicture: 'https://plus.unsplash.com/premium_photo-1689551671541-31a345ce6ae0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyc3xlbnwwfHwwfHx8MA%3D%3D',
		lastMessage: 'Heyy',
		timestamp: '14:55'
	},
	{
		id: '123433',
		name: 'Kristen Stewart',
		profilePicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyc3xlbnwwfHwwfHx8MA%3D%3D',
		lastMessage: 'Omor',
		timestamp: '22:00'
	},
]);
</script>

<template>
  <div class="h-full flex justify-center items-center px-1">
    <div class="grid grid-cols-1 md:grid-cols-12 w-full h-full">
		<div class="col-span-4 flex h-full bg-white border-r border-gray-200">
  <!-- Sidebar -->
  <div class="w-14 flex flex-col items-center py-6 gap-6 bg-gray-50">
    <!-- Top Menu Icon -->
    <button type="button" class="text-gray-600 hover:text-blue-600 transition">
      <Icon name="material-symbols:menu" class="!w-6 !h-6 cursor-pointer" />
    </button>

    <!-- Navigation Icons -->
    <div class="flex flex-col items-center gap-6 mt-4">
      <button type="button" class="text-gray-600 hover:text-blue-600 transition">
        <Icon name="solar:chat-round-line-linear" class="!w-6 !h-6 cursor-pointer" />
      </button>
      <button type="button" class="text-gray-600 hover:text-blue-600 transition">
        <Icon name="lucide:phone" class="!w-6 !h-6 cursor-pointer" />
      </button>
      <button type="button" class="text-gray-600 hover:text-blue-600 transition">
        <Icon name="lucide:user-plus" class="!w-6 !h-6 cursor-pointer" />
      </button>
    </div>
  </div>

  <!-- Content area -->
  <!-- Content Area -->
  <div class="flex-1 flex flex-col px-6 py-6 bg-white">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
    <!-- Title -->
    <h1 class="text-2xl font-semibold text-gray-800">Chats</h1>

    <!-- Action Icons -->
    <div class="flex items-center gap-4">
      <button class="text-gray-600 hover:text-blue-600 transition-colors duration-200">
        <Icon name="lucide:square-pen" class="!w-6 !h-6 cursor-pointer" />
      </button>
      <button class="text-gray-600 hover:text-blue-600 transition-colors duration-200">
        <Icon name="lucide:list-filter" class="!w-6 !h-6 cursor-pointer" />
      </button>
    </div>
  </div>

  <!-- Search Input -->
<!-- Search Input -->
<div class="relative w-full max-w-md mb-6">
  <Input
    id="search"
    type="text"
    placeholder="Search or start a new chat"
    class="w-full pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
  />
  <span class="absolute inset-y-0 end-0 flex items-center pr-3 pointer-events-none">
    <Icon name="lucide:search" class="w-5 h-5 text-gray-400" />
  </span>
</div>

<!-- Chat List -->
<div v-for="chat in chats" :key="chat.id" class="flex items-center justify-between gap-4 py-4 border-b border-gray-200 hover:bg-gray-50 transition">
  <!-- Avatar + Name & Message -->
  <div class="flex items-center gap-4">
    <Avatar class="w-12 h-12">
      <AvatarImage :src="chat.profilePicture" :alt="chat.name" />
      <AvatarFallback>{{ chat.name.slice(0, 2).toUpperCase() }}</AvatarFallback>
    </Avatar>

    <div class="flex flex-col">
      <h2 class="text-base font-medium text-gray-900 truncate">{{ chat.name }}</h2>
      <span class="text-sm text-gray-600 truncate max-w-xs">{{ chat.lastMessage }}</span>
    </div>
  </div>

  <!-- Timestamp -->
  <div class="text-sm text-gray-500 whitespace-nowrap">
    {{ chat.timestamp }}
  </div>
</div>

</div>

</div>

<div class="col-span-8 px-6 py-4 bg-white">
  <div class="border-b border-gray-200 flex justify-between items-center pb-4">
    
    <!-- User Info -->
    <div class="flex items-center gap-4">
      <Avatar class="w-14 h-14">
        <AvatarImage
          src="https://plus.unsplash.com/premium_photo-1689551671541-31a345ce6ae0?w=600&auto=format&fit=crop&q=60"
          alt="John Doe"
        />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>

      <div class="flex flex-col">
        <h2 class="text-lg font-semibold text-gray-900">John Doe</h2>
        <span class="text-sm text-green-500 font-medium">Online</span>
      </div>
    </div>

    <!-- Action Icons -->
    <div class="flex items-center gap-3 sm:gap-4">
      <button type="button" class="text-gray-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 p-2 rounded">
        <Icon name="lucide:video" class="!w-6 !h-6" />
      </button>
      <button type="button" class="text-gray-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 p-2 rounded">
        <Icon name="lucide:phone" class="!w-6 !h-6" />
      </button>
      <button type="button" class="text-gray-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 p-2 rounded">
        <Icon name="lucide:ellipsis-vertical" class="!w-6 !h-6" />
      </button>
    </div>
  </div>
</div>


	</div>
  </div>
</template>