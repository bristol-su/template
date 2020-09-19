@extends('bristolsu::base')

@section('content')
    <div v-pre>
        <div id="template-vue-root">
            @yield('module-content')
        </div>
    </div>

@endsection

@push('styles')
    <link href="{{ asset('modules/template/css/module.css') }}" rel="stylesheet">
@endpush

@push('scripts')
    <script src="{{ asset('modules/template/js/module.js') }}"></script>
@endpush
