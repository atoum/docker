<?php

namespace dummies {
    class dummy {}
}

namespace dummies\tests\units {
    use atoum;

    class dummy extends atoum {
        public function testClass() { $this->integer(42); }
    }
}
