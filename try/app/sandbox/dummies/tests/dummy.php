<?php

namespace dummies\tests {
    class dummy {}
}

namespace dummies\tests\units\tests {
    use atoum;

    class dummy extends atoum {
        public function testClass() { $this->integer(42); }
    }
}
